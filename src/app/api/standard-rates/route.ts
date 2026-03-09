import { NextRequest, NextResponse } from "next/server";
import { standardFeeRates } from "@/data/feeRates";

// GET 获取所有标准费率
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: standardFeeRates,
    });
  } catch (error) {
    console.error("获取标准费率失败:", error);
    return NextResponse.json(
      { error: "获取标准费率失败" },
      { status: 500 }
    );
  }
}

// PUT 更新标准费率（管理功能）
export async function PUT(request: NextRequest) {
  try {
    const { symbol, standardCommissionRate, standardMarginRate } = await request.json();

    if (!symbol) {
      return NextResponse.json(
        { error: "缺少合约代码" },
        { status: 400 }
      );
    }

    // 查找对应的合约
    const rateIndex = standardFeeRates.findIndex((r) => r.symbol === symbol);

    if (rateIndex === -1) {
      return NextResponse.json(
        { error: "未找到该合约" },
        { status: 404 }
      );
    }

    // 更新费率
    if (standardCommissionRate !== undefined) {
      standardFeeRates[rateIndex].standardCommissionRate = standardCommissionRate;
    }
    if (standardMarginRate !== undefined) {
      standardFeeRates[rateIndex].standardMarginRate = standardMarginRate;
    }

    return NextResponse.json({
      success: true,
      message: "费率更新成功",
      data: standardFeeRates[rateIndex],
    });
  } catch (error) {
    console.error("更新标准费率失败:", error);
    return NextResponse.json(
      { error: "更新标准费率失败" },
      { status: 500 }
    );
  }
}
