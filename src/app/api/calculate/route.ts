import { NextRequest, NextResponse } from "next/server";

// 期货计算接口类型
interface CalculateRequest {
  symbol: string; // 合约代码
  price: number; // 价格
  quantity: number; // 数量（手）
  contractSize: number; // 合约乘数
  commissionRate: number; // 手续费率
  marginRate: number; // 保证金率
  direction: 'long' | 'short'; // 交易方向
}

// 计算结果接口
interface CalculateResult {
  symbol: string;
  direction: string;
  price: number;
  quantity: number;
  contractSize: number;
  contractValue: number; // 合约价值
  commissionRate: number;
  commission: number; // 手续费
  marginRate: number;
  margin: number; // 保证金
  totalCost: number; // 总成本（保证金 + 手续费）
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

    // 计算手续费
    const commission = contractValue * (body.commissionRate / 100);

    // 计算保证金
    const margin = contractValue * (body.marginRate / 100);

    // 计算总成本
    const totalCost = margin + commission;

    const result: CalculateResult = {
      symbol: body.symbol,
      direction: body.direction === 'long' ? '做多' : '做空',
      price: body.price,
      quantity: body.quantity,
      contractSize: body.contractSize,
      contractValue: Number(contractValue.toFixed(2)),
      commissionRate: body.commissionRate,
      commission: Number(commission.toFixed(2)),
      marginRate: body.marginRate,
      margin: Number(margin.toFixed(2)),
      totalCost: Number(totalCost.toFixed(2)),
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
