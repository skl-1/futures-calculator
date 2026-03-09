// 标准期货手续费率和保证金率配置

// 费率类型枚举
export enum CommissionType {
  FIXED = "fixed", // 固定费率（每手固定金额）
  PERCENTAGE = "percentage", // 按金额费率（按合约价值的百分比）
}

export interface StandardFeeRate {
  name: string; // 品种名称
  symbol: string; // 合约代码
  exchange: string; // 交易所
  contractSize: number; // 合约乘数
  commissionType: CommissionType; // 手续费类型
  standardCommissionRate: number; // 标准手续费率（万分之一，仅用于按金额费率）
  fixedCommissionPerLot: number; // 每手固定手续费（仅用于固定费率，单位：元）
  standardMarginRate: number; // 标准保证金率（%）
  description: string; // 品种说明
}

export const standardFeeRates: StandardFeeRate[] = [
  // ========== 上海期货交易所 (SHFE) ==========
  {
    name: "螺纹钢",
    symbol: "RB",
    exchange: "上海期货交易所",
    contractSize: 10,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 1, // 万分之一 = 0.01%
    fixedCommissionPerLot: 0,
    standardMarginRate: 8,
    description: "建筑钢材，活跃度高",
  },
  {
    name: "热卷",
    symbol: "HC",
    exchange: "上海期货交易所",
    contractSize: 10,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 1,
    fixedCommissionPerLot: 0,
    standardMarginRate: 8,
    description: "热轧卷板，与螺纹钢相关",
  },
  {
    name: "铜",
    symbol: "CU",
    exchange: "上海期货交易所",
    contractSize: 5,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 5, // 万分之5 = 0.05%
    fixedCommissionPerLot: 0,
    standardMarginRate: 12,
    description: "有色金属龙头，国际联动",
  },
  {
    name: "铝",
    symbol: "AL",
    exchange: "上海期货交易所",
    contractSize: 5,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 3,
    fixedCommissionPerLot: 0,
    standardMarginRate: 10,
    description: "基础有色金属",
  },
  {
    name: "锌",
    symbol: "ZN",
    exchange: "上海期货交易所",
    contractSize: 5,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 3,
    fixedCommissionPerLot: 0,
    standardMarginRate: 10,
    description: "有色金属品种",
  },
  {
    name: "镍",
    symbol: "NI",
    exchange: "上海期货交易所",
    contractSize: 1,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 6,
    fixedCommissionPerLot: 0,
    standardMarginRate: 15,
    description: "高波动有色金属",
  },
  {
    name: "黄金",
    symbol: "AU",
    exchange: "上海期货交易所",
    contractSize: 1000,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 10,
    fixedCommissionPerLot: 0,
    standardMarginRate: 8,
    description: "贵金属，避险属性",
  },
  {
    name: "白银",
    symbol: "AG",
    exchange: "上海期货交易所",
    contractSize: 15,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 5,
    fixedCommissionPerLot: 0,
    standardMarginRate: 10,
    description: "贵金属品种",
  },
  {
    name: "燃油",
    symbol: "FU",
    exchange: "上海期货交易所",
    contractSize: 50,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 0.5,
    fixedCommissionPerLot: 0,
    standardMarginRate: 10,
    description: "燃料油品种",
  },
  {
    name: "沥青",
    symbol: "BU",
    exchange: "上海期货交易所",
    contractSize: 10,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 1,
    fixedCommissionPerLot: 0,
    standardMarginRate: 10,
    description: "石油沥青品种",
  },
  {
    name: "铅",
    symbol: "PB",
    exchange: "上海期货交易所",
    contractSize: 5,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 4,
    fixedCommissionPerLot: 0,
    standardMarginRate: 12,
    description: "铅品种",
  },
  {
    name: "锡",
    symbol: "SN",
    exchange: "上海期货交易所",
    contractSize: 1,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 3,
    fixedCommissionPerLot: 0,
    standardMarginRate: 15,
    description: "锡品种",
  },
  {
    name: "橡胶",
    symbol: "RU",
    exchange: "上海期货交易所",
    contractSize: 10,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 3,
    fixedCommissionPerLot: 0,
    standardMarginRate: 12,
    description: "天然橡胶",
  },

  // ========== 上海国际能源交易中心 (INE) ==========
  {
    name: "原油",
    symbol: "SC",
    exchange: "上海国际能源交易中心",
    contractSize: 1000,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 20, // 万分之20 = 0.2%
    fixedCommissionPerLot: 0,
    standardMarginRate: 10,
    description: "国际原油，波动大",
  },
  {
    name: "低硫燃料油",
    symbol: "LU",
    exchange: "上海国际能源交易中心",
    contractSize: 10,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 0.5,
    fixedCommissionPerLot: 0,
    standardMarginRate: 12,
    description: "低硫燃料油",
  },
  {
    name: "20号胶",
    symbol: "NR",
    exchange: "上海国际能源交易中心",
    contractSize: 10,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 4,
    fixedCommissionPerLot: 0,
    standardMarginRate: 12,
    description: "20号橡胶",
  },

  // ========== 大连商品交易所 (DCE) ==========
  {
    name: "铁矿石",
    symbol: "I",
    exchange: "大连商品交易所",
    contractSize: 100,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 0.5, // 万分之0.5 = 0.005%
    fixedCommissionPerLot: 0,
    standardMarginRate: 12,
    description: "钢铁原料，波动较大",
  },
  {
    name: "焦煤",
    symbol: "JM",
    exchange: "大连商品交易所",
    contractSize: 60,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 3,
    fixedCommissionPerLot: 0,
    standardMarginRate: 10,
    description: "煤炭品种，波动较大",
  },
  {
    name: "焦炭",
    symbol: "J",
    exchange: "大连商品交易所",
    contractSize: 100,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 1,
    fixedCommissionPerLot: 0,
    standardMarginRate: 10,
    description: "冶金焦炭，波动较大",
  },
  {
    name: "豆粕",
    symbol: "M",
    exchange: "大连商品交易所",
    contractSize: 10,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 1.5,
    fixedCommissionPerLot: 0,
    standardMarginRate: 8,
    description: "农产品，活跃",
  },
  {
    name: "豆油",
    symbol: "Y",
    exchange: "大连商品交易所",
    contractSize: 10,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 1.5,
    fixedCommissionPerLot: 0,
    standardMarginRate: 8,
    description: "农产品",
  },
  {
    name: "棕榈油",
    symbol: "P",
    exchange: "大连商品交易所",
    contractSize: 10,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 2.5,
    fixedCommissionPerLot: 0,
    standardMarginRate: 10,
    description: "进口植物油",
  },
  {
    name: "玉米",
    symbol: "C",
    exchange: "大连商品交易所",
    contractSize: 10,
    commissionType: CommissionType.FIXED, // 固定费率
    standardCommissionRate: 0,
    fixedCommissionPerLot: 6, // 每手固定6元
    standardMarginRate: 7,
    description: "基础农产品，固定费率",
  },
  {
    name: "玉米淀粉",
    symbol: "CS",
    exchange: "大连商品交易所",
    contractSize: 10,
    commissionType: CommissionType.FIXED,
    standardCommissionRate: 0,
    fixedCommissionPerLot: 1.5, // 每手固定1.5元
    standardMarginRate: 7,
    description: "玉米淀粉，固定费率",
  },
  {
    name: "生猪",
    symbol: "LH",
    exchange: "大连商品交易所",
    contractSize: 16,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 4,
    fixedCommissionPerLot: 0,
    standardMarginRate: 12,
    description: "活体期货，波动大",
  },
  {
    name: "鸡蛋",
    symbol: "JD",
    exchange: "大连商品交易所",
    contractSize: 10,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 1.5,
    fixedCommissionPerLot: 0,
    standardMarginRate: 8,
    description: "鸡蛋期货",
  },
  {
    name: "聚乙烯",
    symbol: "L",
    exchange: "大连商品交易所",
    contractSize: 5,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 2,
    fixedCommissionPerLot: 0,
    standardMarginRate: 9,
    description: "聚乙烯LLDPE",
  },
  {
    name: "聚丙烯",
    symbol: "PP",
    exchange: "大连商品交易所",
    contractSize: 5,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 0.6,
    fixedCommissionPerLot: 0,
    standardMarginRate: 9,
    description: "聚丙烯",
  },
  {
    name: "聚氯乙烯",
    symbol: "V",
    exchange: "大连商品交易所",
    contractSize: 5,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 2,
    fixedCommissionPerLot: 0,
    standardMarginRate: 9,
    description: "聚氯乙烯PVC",
  },

  // ========== 郑州商品交易所 (CZCE) ==========
  {
    name: "PTA",
    symbol: "TA",
    exchange: "郑州商品交易所",
    contractSize: 5,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 3,
    fixedCommissionPerLot: 0,
    standardMarginRate: 8,
    description: "化工品种，活跃",
  },
  {
    name: "甲醇",
    symbol: "MA",
    exchange: "郑州商品交易所",
    contractSize: 50,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 1,
    fixedCommissionPerLot: 0,
    standardMarginRate: 8,
    description: "化工品种",
  },
  {
    name: "纯碱",
    symbol: "SA",
    exchange: "郑州商品交易所",
    contractSize: 20,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 2, // 万分之二
    fixedCommissionPerLot: 0,
    standardMarginRate: 9,
    description: "化工新品种，万分之二",
  },
  {
    name: "玻璃",
    symbol: "FG",
    exchange: "郑州商品交易所",
    contractSize: 20,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 6,
    fixedCommissionPerLot: 0,
    standardMarginRate: 9,
    description: "建材品种",
  },
  {
    name: "白糖",
    symbol: "SR",
    exchange: "郑州商品交易所",
    contractSize: 10,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 3,
    fixedCommissionPerLot: 0,
    standardMarginRate: 8,
    description: "软商品",
  },
  {
    name: "棉花",
    symbol: "CF",
    exchange: "郑州商品交易所",
    contractSize: 5,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 4,
    fixedCommissionPerLot: 0,
    standardMarginRate: 8,
    description: "农产品",
  },
  {
    name: "棉花纱",
    symbol: "CY",
    exchange: "郑州商品交易所",
    contractSize: 5,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 4,
    fixedCommissionPerLot: 0,
    standardMarginRate: 8,
    description: "棉纱期货",
  },
  {
    name: "菜油",
    symbol: "OI",
    exchange: "郑州商品交易所",
    contractSize: 10,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 2,
    fixedCommissionPerLot: 0,
    standardMarginRate: 9,
    description: "菜籽油",
  },
  {
    name: "菜粕",
    symbol: "RM",
    exchange: "郑州商品交易所",
    contractSize: 10,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 1.5,
    fixedCommissionPerLot: 0,
    standardMarginRate: 9,
    description: "菜籽粕",
  },
  {
    name: "菜籽",
    symbol: "RS",
    exchange: "郑州商品交易所",
    contractSize: 10,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 2,
    fixedCommissionPerLot: 0,
    standardMarginRate: 10,
    description: "油菜籽",
  },
  {
    name: "尿素",
    symbol: "UR",
    exchange: "郑州商品交易所",
    contractSize: 20,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 1,
    fixedCommissionPerLot: 0,
    standardMarginRate: 9,
    description: "尿素化肥",
  },
  {
    name: "硅铁",
    symbol: "SF",
    exchange: "郑州商品交易所",
    contractSize: 5,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 3,
    fixedCommissionPerLot: 0,
    standardMarginRate: 12,
    description: "硅铁合金",
  },
  {
    name: "锰硅",
    symbol: "SM",
    exchange: "郑州商品交易所",
    contractSize: 5,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 6,
    fixedCommissionPerLot: 0,
    standardMarginRate: 12,
    description: "锰硅合金",
  },

  // ========== 广州期货交易所 (GFEX) ==========
  {
    name: "工业硅",
    symbol: "SI",
    exchange: "广州期货交易所",
    contractSize: 5,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 3,
    fixedCommissionPerLot: 0,
    standardMarginRate: 12,
    description: "工业硅",
  },
  {
    name: "碳酸锂",
    symbol: "LC",
    exchange: "广州期货交易所",
    contractSize: 1,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 4,
    fixedCommissionPerLot: 0,
    standardMarginRate: 15,
    description: "电池级碳酸锂，新能源原料",
  },

  // ========== 中国金融期货交易所 (CFFEX) ==========
  {
    name: "中证1000股指",
    symbol: "IM",
    exchange: "中国金融期货交易所",
    contractSize: 200,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 0.23, // 0.023%
    fixedCommissionPerLot: 0,
    standardMarginRate: 15,
    description: "小盘股指数期货",
  },
  {
    name: "沪深300股指",
    symbol: "IF",
    exchange: "中国金融期货交易所",
    contractSize: 300,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 0.23, // 0.023%
    fixedCommissionPerLot: 0,
    standardMarginRate: 15,
    description: "大盘股指数期货",
  },
  {
    name: "上证50股指",
    symbol: "IH",
    exchange: "中国金融期货交易所",
    contractSize: 300,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 0.23, // 0.023%
    fixedCommissionPerLot: 0,
    standardMarginRate: 15,
    description: "蓝筹股指数期货",
  },
  {
    name: "中证500股指",
    symbol: "IC",
    exchange: "中国金融期货交易所",
    contractSize: 200,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 0.23, // 0.023%
    fixedCommissionPerLot: 0,
    standardMarginRate: 15,
    description: "中盘股指数期货",
  },
  {
    name: "10年期国债",
    symbol: "T",
    exchange: "中国金融期货交易所",
    contractSize: 10000,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 3,
    fixedCommissionPerLot: 0,
    standardMarginRate: 2,
    description: "10年期国债期货",
  },
  {
    name: "5年期国债",
    symbol: "TF",
    exchange: "中国金融期货交易所",
    contractSize: 10000,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 3,
    fixedCommissionPerLot: 0,
    standardMarginRate: 1.2,
    description: "5年期国债期货",
  },
  {
    name: "2年期国债",
    symbol: "TS",
    exchange: "中国金融期货交易所",
    contractSize: 20000,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 3,
    fixedCommissionPerLot: 0,
    standardMarginRate: 0.5,
    description: "2年期国债期货",
  },
];

// 根据合约代码查找标准费率
export function getStandardFeeRate(symbol: string): StandardFeeRate | undefined {
  return standardFeeRates.find((item) => item.symbol === symbol);
}

// 获取交易所所有品种
export function getContractsByExchange(exchange: string): StandardFeeRate[] {
  return standardFeeRates.filter((item) => item.exchange === exchange);
}

// 获取所有交易所列表
export function getExchanges(): string[] {
  return Array.from(new Set(standardFeeRates.map((item) => item.exchange)));
}

// 计算手续费
export function calculateCommission(
  contractValue: number,
  quantity: number,
  feeRate: StandardFeeRate
): number {
  if (feeRate.commissionType === CommissionType.FIXED) {
    // 固定费率：每手固定金额 × 手数
    return feeRate.fixedCommissionPerLot * quantity;
  } else {
    // 按金额费率：合约价值 × 费率率
    return contractValue * (feeRate.standardCommissionRate / 10000);
  }
}
