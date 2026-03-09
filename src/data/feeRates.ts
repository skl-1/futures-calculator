// 标准期货手续费率和保证金率配置

// 费率类型枚举
export enum CommissionType {
  FIXED = "fixed", // 固定费率（每手固定金额）
  PERCENTAGE = "percentage", // 按金额费率（按合约价值的百分比）
}

export interface StandardFeeRate {
  name: string; // 品种名称
  symbol: string; // 合约代码（含交割月）
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
    name: "白银2603",
    symbol: "AG2603",
    exchange: "上海期货交易所",
    contractSize: 15,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 0.5, // 万分之0.5 = 0.005%
    fixedCommissionPerLot: 0,
    standardMarginRate: 22,
    description: "白银品种，按金额费率",
  },
  {
    name: "黄金2603",
    symbol: "AU2603",
    exchange: "上海期货交易所",
    contractSize: 1000,
    commissionType: CommissionType.FIXED,
    standardCommissionRate: 0,
    fixedCommissionPerLot: 19.99, // 19.99元/手
    standardMarginRate: 19,
    description: "黄金品种，固定费率",
  },
  {
    name: "沪锡2603",
    symbol: "SN2603",
    exchange: "上海期货交易所",
    contractSize: 1,
    commissionType: CommissionType.FIXED,
    standardCommissionRate: 0,
    fixedCommissionPerLot: 3, // 3元/手
    standardMarginRate: 15,
    description: "锡品种，固定费率",
  },
  {
    name: "沪铜2603",
    symbol: "CU2603",
    exchange: "上海期货交易所",
    contractSize: 5,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 0.5, // 万分之0.5 = 0.005%
    fixedCommissionPerLot: 0,
    standardMarginRate: 15,
    description: "铜品种，按金额费率",
  },
  {
    name: "沪镍2603",
    symbol: "NI2603",
    exchange: "上海期货交易所",
    contractSize: 1,
    commissionType: CommissionType.FIXED,
    standardCommissionRate: 0,
    fixedCommissionPerLot: 3, // 3元/手
    standardMarginRate: 15,
    description: "镍品种，固定费率",
  },
  {
    name: "沪铝2603",
    symbol: "AL2603",
    exchange: "上海期货交易所",
    contractSize: 5,
    commissionType: CommissionType.FIXED,
    standardCommissionRate: 0,
    fixedCommissionPerLot: 3, // 3元/手
    standardMarginRate: 15,
    description: "铝品种，固定费率",
  },
  {
    name: "沪铅2603",
    symbol: "PB2603",
    exchange: "上海期货交易所",
    contractSize: 5,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 0.4, // 万分之0.4 = 0.004%
    fixedCommissionPerLot: 0,
    standardMarginRate: 15,
    description: "铅品种，按金额费率",
  },
  {
    name: "沪锌2603",
    symbol: "ZN2603",
    exchange: "上海期货交易所",
    contractSize: 5,
    commissionType: CommissionType.FIXED,
    standardCommissionRate: 0,
    fixedCommissionPerLot: 3, // 3元/手
    standardMarginRate: 15,
    description: "锌品种，固定费率",
  },
  {
    name: "氧化铝2603",
    symbol: "AO2603",
    exchange: "上海期货交易所",
    contractSize: 20,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 1, // 万分之1 = 0.01%
    fixedCommissionPerLot: 0,
    standardMarginRate: 15,
    description: "氧化铝品种，按金额费率",
  },
  {
    name: "线材2603",
    symbol: "WR2603",
    exchange: "上海期货交易所",
    contractSize: 10,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 0.4, // 万分之0.4 = 0.004%
    fixedCommissionPerLot: 0,
    standardMarginRate: 15,
    description: "线材品种，按金额费率",
  },
  {
    name: "不锈钢2603",
    symbol: "SS2603",
    exchange: "上海期货交易所",
    contractSize: 5,
    commissionType: CommissionType.FIXED,
    standardCommissionRate: 0,
    fixedCommissionPerLot: 2, // 2元/手
    standardMarginRate: 15,
    description: "不锈钢品种，固定费率",
  },
  {
    name: "铸造铝2603",
    symbol: "AD2603",
    exchange: "上海期货交易所",
    contractSize: 5,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 0.5, // 万分之0.5 = 0.005%
    fixedCommissionPerLot: 0,
    standardMarginRate: 15,
    description: "铸造铝品种，按金额费率",
  },
  {
    name: "螺纹钢2603",
    symbol: "RB2603",
    exchange: "上海期货交易所",
    contractSize: 10,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 1, // 万分之1 = 0.01%
    fixedCommissionPerLot: 0,
    standardMarginRate: 15,
    description: "螺纹钢品种，按金额费率",
  },
  {
    name: "热卷2603",
    symbol: "HC2603",
    exchange: "上海期货交易所",
    contractSize: 10,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 1, // 万分之1 = 0.01%
    fixedCommissionPerLot: 0,
    standardMarginRate: 15,
    description: "热卷品种，按金额费率",
  },
  {
    name: "沥青2603",
    symbol: "BU2603",
    exchange: "上海期货交易所",
    contractSize: 10,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 0.5, // 万分之0.5 = 0.005%
    fixedCommissionPerLot: 0,
    standardMarginRate: 15,
    description: "沥青品种，按金额费率",
  },
  {
    name: "燃油2703",
    symbol: "FU2703",
    exchange: "上海期货交易所",
    contractSize: 50,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 0.1, // 万分之0.1 = 0.001%
    fixedCommissionPerLot: 0,
    standardMarginRate: 17,
    description: "燃油品种，按金额费率",
  },
  {
    name: "合成橡胶2603",
    symbol: "BR2603",
    exchange: "上海期货交易所",
    contractSize: 10,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 0.2, // 万分之0.2 = 0.002%
    fixedCommissionPerLot: 0,
    standardMarginRate: 15,
    description: "合成橡胶品种，按金额费率",
  },
  {
    name: "橡胶2603",
    symbol: "RU2603",
    exchange: "上海期货交易所",
    contractSize: 10,
    commissionType: CommissionType.FIXED,
    standardCommissionRate: 0,
    fixedCommissionPerLot: 3, // 3元/手
    standardMarginRate: 15,
    description: "橡胶品种，固定费率",
  },
  {
    name: "纸浆2603",
    symbol: "SP2603",
    exchange: "上海期货交易所",
    contractSize: 10,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 0.5, // 万分之0.5 = 0.005%
    fixedCommissionPerLot: 0,
    standardMarginRate: 15,
    description: "纸浆品种，按金额费率",
  },
  {
    name: "胶版纸2603",
    symbol: "OP2603",
    exchange: "上海期货交易所",
    contractSize: 10,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 0.5, // 万分之0.5 = 0.005%
    fixedCommissionPerLot: 0,
    standardMarginRate: 15,
    description: "胶版纸品种，按金额费率",
  },
  {
    name: "豆油2603",
    symbol: "Y2603",
    exchange: "上海期货交易所",
    contractSize: 10,
    commissionType: CommissionType.FIXED,
    standardCommissionRate: 0,
    fixedCommissionPerLot: 2.5, // 2.5元/手
    standardMarginRate: 20,
    description: "豆油品种，固定费率",
  },
  {
    name: "棕榈油2603",
    symbol: "P2603",
    exchange: "上海期货交易所",
    contractSize: 10,
    commissionType: CommissionType.FIXED,
    standardCommissionRate: 0,
    fixedCommissionPerLot: 2.5, // 2.5元/手
    standardMarginRate: 20,
    description: "棕榈油品种，固定费率",
  },
  {
    name: "豆一2603",
    symbol: "A2603",
    exchange: "上海期货交易所",
    contractSize: 10,
    commissionType: CommissionType.FIXED,
    standardCommissionRate: 0,
    fixedCommissionPerLot: 2, // 2元/手
    standardMarginRate: 20,
    description: "豆一品种，固定费率",
  },
  {
    name: "豆二2603",
    symbol: "B2603",
    exchange: "上海期货交易所",
    contractSize: 10,
    commissionType: CommissionType.FIXED,
    standardCommissionRate: 0,
    fixedCommissionPerLot: 1, // 1元/手
    standardMarginRate: 20,
    description: "豆二品种，固定费率",
  },
  {
    name: "豆粕2603",
    symbol: "M2603",
    exchange: "上海期货交易所",
    contractSize: 10,
    commissionType: CommissionType.FIXED,
    standardCommissionRate: 0,
    fixedCommissionPerLot: 1.5, // 1.5元/手
    standardMarginRate: 20,
    description: "豆粕品种，固定费率",
  },
  {
    name: "玉米2603",
    symbol: "C2603",
    exchange: "上海期货交易所",
    contractSize: 10,
    commissionType: CommissionType.FIXED,
    standardCommissionRate: 0,
    fixedCommissionPerLot: 1.2, // 1.2元/手
    standardMarginRate: 20,
    description: "玉米品种，固定费率",
  },
  {
    name: "玉米淀粉2603",
    symbol: "CS2603",
    exchange: "上海期货交易所",
    contractSize: 10,
    commissionType: CommissionType.FIXED,
    standardCommissionRate: 0,
    fixedCommissionPerLot: 1.5, // 1.5元/手
    standardMarginRate: 20,
    description: "玉米淀粉品种，固定费率",
  },
  {
    name: "鸡蛋2603",
    symbol: "JD2603",
    exchange: "上海期货交易所",
    contractSize: 10,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 1.5, // 万分之1.5 = 0.015%
    fixedCommissionPerLot: 0,
    standardMarginRate: 20,
    description: "鸡蛋品种，按金额费率",
  },
  {
    name: "聚乙烯2603",
    symbol: "L2603",
    exchange: "上海期货交易所",
    contractSize: 5,
    commissionType: CommissionType.FIXED,
    standardCommissionRate: 0,
    fixedCommissionPerLot: 1, // 1元/手
    standardMarginRate: 7,
    description: "聚乙烯品种，固定费率",
  },
  {
    name: "聚丙烯2603",
    symbol: "PP2603",
    exchange: "上海期货交易所",
    contractSize: 5,
    commissionType: CommissionType.FIXED,
    standardCommissionRate: 0,
    fixedCommissionPerLot: 1, // 1元/手
    standardMarginRate: 7,
    description: "聚丙烯品种，固定费率",
  },
  {
    name: "聚氯乙烯月均价2604",
    symbol: "V2604",
    exchange: "上海期货交易所",
    contractSize: 5,
    commissionType: CommissionType.FIXED,
    standardCommissionRate: 0,
    fixedCommissionPerLot: 1, // 1元/手
    standardMarginRate: 7,
    description: "聚氯乙烯品种，固定费率",
  },
  {
    name: "乙二醇2603",
    symbol: "EG2603",
    exchange: "上海期货交易所",
    contractSize: 10,
    commissionType: CommissionType.FIXED,
    standardCommissionRate: 0,
    fixedCommissionPerLot: 3, // 3元/手
    standardMarginRate: 20,
    description: "乙二醇品种，固定费率",
  },
  {
    name: "苯乙烯2603",
    symbol: "EB2603",
    exchange: "上海期货交易所",
    contractSize: 10,
    commissionType: CommissionType.FIXED,
    standardCommissionRate: 0,
    fixedCommissionPerLot: 3, // 3元/手
    standardMarginRate: 20,
    description: "苯乙烯品种，固定费率",
  },
  {
    name: "纯碱2603",
    symbol: "SA2603",
    exchange: "上海期货交易所",
    contractSize: 20,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 1, // 万分之1 = 0.01%
    fixedCommissionPerLot: 0,
    standardMarginRate: 10,
    description: "纯碱品种，按金额费率",
  },
  {
    name: "铁矿石2603",
    symbol: "I2603",
    exchange: "上海期货交易所",
    contractSize: 100,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 1, // 万分之1 = 0.01%
    fixedCommissionPerLot: 0,
    standardMarginRate: 20,
    description: "铁矿石品种，按金额费率",
  },
  {
    name: "焦煤2603",
    symbol: "JM2603",
    exchange: "上海期货交易所",
    contractSize: 60,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 1, // 万分之1 = 0.01%
    fixedCommissionPerLot: 0,
    standardMarginRate: 20,
    description: "焦煤品种，按金额费率",
  },
  {
    name: "焦炭2603",
    symbol: "J2603",
    exchange: "上海期货交易所",
    contractSize: 100,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 1.4, // 万分之1.4 = 0.014%
    fixedCommissionPerLot: 0,
    standardMarginRate: 20,
    description: "焦炭品种，按金额费率",
  },
  {
    name: "纤维板2603",
    symbol: "FB2603",
    exchange: "上海期货交易所",
    contractSize: 10,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 1, // 万分之1 = 0.01%
    fixedCommissionPerLot: 0,
    standardMarginRate: 20,
    description: "纤维板品种，按金额费率",
  },
  {
    name: "胶板2603",
    symbol: "BB2603",
    exchange: "上海期货交易所",
    contractSize: 10,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 1, // 万分之1 = 0.01%
    fixedCommissionPerLot: 0,
    standardMarginRate: 20,
    description: "胶板品种，按金额费率",
  },
  {
    name: "液化石油气2603",
    symbol: "PG2603",
    exchange: "上海期货交易所",
    contractSize: 20,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 1, // 万分之1 = 0.01%
    fixedCommissionPerLot: 0,
    standardMarginRate: 20,
    description: "液化石油气品种，按金额费率",
  },
  {
    name: "国际铜2603",
    symbol: "BC2603",
    exchange: "上海期货交易所",
    contractSize: 5,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 0.1, // 万分之0.1 = 0.001%
    fixedCommissionPerLot: 0,
    standardMarginRate: 15,
    description: "国际铜品种，按金额费率",
  },
  {
    name: "纯苯2603",
    symbol: "BZ2603",
    exchange: "上海期货交易所",
    contractSize: 5,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 1, // 万分之1 = 0.01%
    fixedCommissionPerLot: 0,
    standardMarginRate: 20,
    description: "纯苯品种，按金额费率",
  },
  {
    name: "工业硅2603",
    symbol: "SI2603",
    exchange: "上海期货交易所",
    contractSize: 5,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 1, // 万分之1 = 0.01%
    fixedCommissionPerLot: 0,
    standardMarginRate: 20,
    description: "工业硅品种，按金额费率",
  },
  {
    name: "碳酸锂2603",
    symbol: "LC2603",
    exchange: "上海期货交易所",
    contractSize: 1,
    commissionType: CommissionType.FIXED,
    standardCommissionRate: 0,
    fixedCommissionPerLot: 1.5, // 1.5元/手
    standardMarginRate: 15,
    description: "碳酸锂品种，固定费率",
  },
  {
    name: "集运指数2604",
    symbol: "EC2604",
    exchange: "上海期货交易所",
    contractSize: 1,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 6, // 万分之6 = 0.06%
    fixedCommissionPerLot: 0,
    standardMarginRate: 22,
    description: "集运指数品种，按金额费率",
  },

  // ========== 上海国际能源交易中心 (INE) ==========
  {
    name: "原油2703",
    symbol: "SC2703",
    exchange: "上海国际能源交易中心",
    contractSize: 1000,
    commissionType: CommissionType.FIXED,
    standardCommissionRate: 0,
    fixedCommissionPerLot: 19.99, // 19.99元/手
    standardMarginRate: 17,
    description: "原油品种，固定费率",
  },
  {
    name: "低硫燃料油2603",
    symbol: "LU2603",
    exchange: "上海国际能源交易中心",
    contractSize: 10,
    commissionType: CommissionType.FIXED,
    standardCommissionRate: 0,
    fixedCommissionPerLot: 3, // 3元/手
    standardMarginRate: 15,
    description: "低硫燃料油品种，固定费率",
  },
  {
    name: "20号胶2603",
    symbol: "NR2603",
    exchange: "上海国际能源交易中心",
    contractSize: 10,
    commissionType: CommissionType.FIXED,
    standardCommissionRate: 0,
    fixedCommissionPerLot: 3, // 3元/手
    standardMarginRate: 15,
    description: "20号胶品种，固定费率",
  },

  // ========== 广州期货交易所 (GFE) ==========
  {
    name: "工业硅2603",
    symbol: "SI2603",
    exchange: "广州期货交易所",
    contractSize: 5,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 1, // 万分之1 = 0.01%
    fixedCommissionPerLot: 0,
    standardMarginRate: 20,
    description: "工业硅品种，按金额费率",
  },
  {
    name: "碳酸锂2603",
    symbol: "LC2603",
    exchange: "广州期货交易所",
    contractSize: 1,
    commissionType: CommissionType.FIXED,
    standardCommissionRate: 0,
    fixedCommissionPerLot: 1.5, // 1.5元/手
    standardMarginRate: 15,
    description: "碳酸锂品种，固定费率",
  },

  // ========== 中国金融期货交易所 (CFFEX) ==========
  {
    name: "钯2606",
    symbol: "PD2606",
    exchange: "中国金融期货交易所",
    contractSize: 1,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 2.5, // 万分之2.5 = 0.025%
    fixedCommissionPerLot: 0,
    standardMarginRate: 22,
    description: "钯品种，按金额费率",
  },
  {
    name: "铂2606",
    symbol: "PT2606",
    exchange: "中国金融期货交易所",
    contractSize: 1,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 2.5, // 万分之2.5 = 0.025%
    fixedCommissionPerLot: 0,
    standardMarginRate: 22,
    description: "铂品种，按金额费率",
  },
  {
    name: "2年期国债2603",
    symbol: "TS2603",
    exchange: "中国金融期货交易所",
    contractSize: 20000,
    commissionType: CommissionType.FIXED,
    standardCommissionRate: 0,
    fixedCommissionPerLot: 3, // 3元/手
    standardMarginRate: 1,
    description: "2年期国债品种，固定费率",
  },
  {
    name: "5年期国债2603",
    symbol: "TF2603",
    exchange: "中国金融期货交易所",
    contractSize: 10000,
    commissionType: CommissionType.FIXED,
    standardCommissionRate: 0,
    fixedCommissionPerLot: 3, // 3元/手
    standardMarginRate: 2,
    description: "5年期国债品种，固定费率",
  },
  {
    name: "10年国债2603",
    symbol: "T2603",
    exchange: "中国金融期货交易所",
    contractSize: 10000,
    commissionType: CommissionType.FIXED,
    standardCommissionRate: 0,
    fixedCommissionPerLot: 3, // 3元/手
    standardMarginRate: 3,
    description: "10年期国债品种，固定费率",
  },
  {
    name: "30年期国债2603",
    symbol: "TL2603",
    exchange: "中国金融期货交易所",
    contractSize: 10000,
    commissionType: CommissionType.FIXED,
    standardCommissionRate: 0,
    fixedCommissionPerLot: 3, // 3元/手
    standardMarginRate: 5,
    description: "30年期国债品种，固定费率",
  },
  {
    name: "沪深300指数2603",
    symbol: "IF2603",
    exchange: "中国金融期货交易所",
    contractSize: 300,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 0.23, // 万分之0.23 = 0.0023%
    fixedCommissionPerLot: 0,
    standardMarginRate: 12,
    description: "沪深300指数品种，按金额费率",
  },
  {
    name: "中证500股指2603",
    symbol: "IC2603",
    exchange: "中国金融期货交易所",
    contractSize: 200,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 0.23, // 万分之0.23 = 0.0023%
    fixedCommissionPerLot: 0,
    standardMarginRate: 12,
    description: "中证500股指品种，按金额费率",
  },
  {
    name: "上证50指数2603",
    symbol: "IH2603",
    exchange: "中国金融期货交易所",
    contractSize: 300,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 0.23, // 万分之0.23 = 0.0023%
    fixedCommissionPerLot: 0,
    standardMarginRate: 12,
    description: "上证50指数品种，按金额费率",
  },
  {
    name: "中证1000股指2603",
    symbol: "IM2603",
    exchange: "中国金融期货交易所",
    contractSize: 200,
    commissionType: CommissionType.PERCENTAGE,
    standardCommissionRate: 0.23, // 万分之0.23 = 0.0023%
    fixedCommissionPerLot: 0,
    standardMarginRate: 12,
    description: "中证1000股指品种，按金额费率",
  },
];

// 辅助函数：根据合约代码查找费率
export const getStandardFeeRate = (symbol: string): StandardFeeRate | undefined => {
  // 不区分大小写查找，并支持模糊匹配（如 RB 可以匹配 RB2603）
  const upperSymbol = symbol.toUpperCase();
  
  // 精确匹配
  let exactMatch = standardFeeRates.find(rate => rate.symbol === upperSymbol);
  if (exactMatch) return exactMatch;
  
  // 模糊匹配：如果用户只输入了品种代码（如 RB），则查找匹配的主力合约
  const prefixMatch = standardFeeRates.find(rate => 
    rate.symbol.startsWith(upperSymbol) || 
    rate.symbol.substring(0, rate.symbol.length - 4) === upperSymbol
  );
  
  return prefixMatch;
};

// 辅助函数：获取所有交易所列表
export const getAllExchanges = (): string[] => {
  return Array.from(new Set(standardFeeRates.map(rate => rate.exchange)));
};

// 辅助函数：根据交易所获取品种列表
export const getSymbolsByExchange = (exchange: string): StandardFeeRate[] => {
  return standardFeeRates.filter(rate => rate.exchange === exchange);
};
