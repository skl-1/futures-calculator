import { NextRequest, NextResponse } from "next/server";
import { getStandardFeeRate, CommissionType } from "@/data/feeRates";

// 费率类型枚举
enum CommissionTypeAPI {
  FIXED = "fixed", // 固定费率（每手固定金额）
  PERCENTAGE = "percentage", // 按金额费率（按合约价值的百分比）
}

// 期货计算接口类型
interface CalculateRequest {
  symbol: string; // 合约代码
  price: number; // 价格
  quantity: number; // 数量（手）
  contractSize: number; // 合约乘数
  commissionRate: number; // 手续费率（用于按金额费率）或每手手续费（用于固定费率）
  marginRate: number; // 保证金率
  direction: 'long' | 'short'; // 交易方向
  commissionType?: CommissionTypeAPI; // 手续费类型（可选，默认根据合约代码获取）
}

// 计算结果接口
interface CalculateResult {
  symbol: string;
  direction: string;
  price: number;
  quantity: number;
  contractSize: number;
  contractValue: number; // 合约价值
  commissionType: string; // 手续费类型
  commissionRate: number; // 显示的费率（按金额或固定金额）
  commission: number; // 手续费
  marginRate: number;
  margin: number; // 保证金
  totalCost: number; // 总成本（保证金 + 手续费）
  standardFeeRate?: { // 标准费率信息（用于对比）
    commissionType: string;
    commissionRate: number;
    marginRate: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: CalculateRequest = await request.json();

    // 验证必填字段
    if (
      !body.symbol ||
      !body.price ||
      !body.quantity ||
      !body.contractSize ||
      body.commissionRate === undefined ||
      body.marginRate === undefined ||
      !body.direction
    ) {
      return NextResponse.json(
        { error: "缺少必填参数" },
        { status: 400 }
      );
    }

    // 验证数值范围
    if (body.price <= 0 || body.quantity <= 0 || body.contractSize <= 0) {
      return NextResponse.json(
        { error: "价格、数量和合约乘数必须大于 0" },
        { status: 400 }
      );
    }

    if (body.commissionRate < 0 || body.marginRate < 0) {
      return NextResponse.json(
        { error: "手续费率和保证金率不能为负数" },
        { status: 400 }
      );
    }

    // 计算合约价值
    const contractValue = body.price * body.quantity * body.contractSize;

    // 获取标准费率信息
    const standardRate = getStandardFeeRate(body.symbol);
    
    // 确定手续费类型（优先使用传入的，否则使用标准配置）
    let commissionType: CommissionTypeAPI;
    if (body.commissionType) {
      commissionType = body.commissionType;
    } else if (standardRate) {
      commissionType = standardRate.commissionType === CommissionType.FIXED 
        ? CommissionTypeAPI.FIXED 
        : CommissionTypeAPI.PERCENTAGE;
    } else {
      // 默认按金额费率
      commissionType = CommissionTypeAPI.PERCENTAGE;
    }

    // 计算手续费
    let commission: number;
    let displayCommissionRate: number;

    if (commissionType === CommissionTypeAPI.FIXED) {
      // 固定费率：每手固定金额 × 手数
      commission = body.commissionRate * body.quantity;
      displayCommissionRate = body.commissionRate; // 显示每手手续费
    } else {
      // 按金额费率：合约价值 × 费率率
      commission = contractValue * (body.commissionRate / 100);
      displayCommissionRate = body.commissionRate; // 显示费率百分比
    }

    // 计算保证金
    const margin = contractValue * (body.marginRate / 100);

    // 计算总成本
    const totalCost = margin + commission;

    // 构建标准费率信息（用于对比）
    const standardFeeRateInfo = standardRate ? {
      commissionType: standardRate.commissionType,
      commissionRate: standardRate.commissionType === CommissionType.FIXED
        ? standardRate.fixedCommissionPerLot // 每手固定金额
        : standardRate.standardCommissionRate / 100, // 费率百分比
      marginRate: standardRate.standardMarginRate,
    } : undefined;

    const result: CalculateResult = {
      symbol: body.symbol,
      direction: body.direction === 'long' ? '做多' : '做空',
      price: body.price,
      quantity: body.quantity,
      contractSize: body.contractSize,
      contractValue: Number(contractValue.toFixed(2)),
      commissionType: commissionType === CommissionTypeAPI.FIXED ? '固定费率' : '按金额费率',
      commissionRate: Number(displayCommissionRate.toFixed(4)),
      commission: Number(commission.toFixed(2)),
      marginRate: body.marginRate,
      margin: Number(margin.toFixed(2)),
      totalCost: Number(totalCost.toFixed(2)),
      standardFeeRate: standardFeeRateInfo,
    };

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("计算错误:", error);
    return NextResponse.json(
      { error: "计算失败，请检查输入参数" },
      { status: 500 }
    );
  }
}
