// 标准期货手续费率和保证金率配置
export interface StandardFeeRate {
  name: string; // 品种名称
  symbol: string; // 合约代码
  exchange: string; // 交易所
  contractSize: number; // 合约乘数
  standardCommissionRate: number; // 标准手续费率（万分之一）
  standardMarginRate: number; // 标准保证金率（%）
  description: string; // 品种说明
}

export const standardFeeRates: StandardFeeRate[] = [
  {
    name: "螺纹钢",
    symbol: "RB",
    exchange: "上海期货交易所",
    contractSize: 10,
    standardCommissionRate: 1, // 万分之一 = 0.01%
    standardMarginRate: 8,
    description: "建筑钢材，活跃度高",
  },
  {
    name: "热卷",
    symbol: "HC",
    exchange: "上海期货交易所",
    contractSize: 10,
    standardCommissionRate: 1,
    standardMarginRate: 8,
    description: "热轧卷板，与螺纹钢相关",
  },
  {
    name: "铁矿石",
    symbol: "I",
    exchange: "大连商品交易所",
    contractSize: 100,
    standardCommissionRate: 0.5, // 万分之0.5 = 0.005%
    standardMarginRate: 12,
    description: "钢铁原料，波动较大",
  },
  {
    name: "焦煤",
    symbol: "JM",
    exchange: "大连商品交易所",
    contractSize: 60,
    standardCommissionRate: 3,
    standardMarginRate: 10,
    description: "煤炭品种，波动较大",
  },
  {
    name: "焦炭",
    symbol: "J",
    exchange: "大连商品交易所",
    contractSize: 100,
    standardCommissionRate: 1,
    standardMarginRate: 10,
    description: "冶金焦炭，波动较大",
  },
  {
    name: "铜",
    symbol: "CU",
    exchange: "上海期货交易所",
    contractSize: 5,
    standardCommissionRate: 5, // 万分之5 = 0.05%
    standardMarginRate: 12,
    description: "有色金属龙头，国际联动",
  },
  {
    name: "铝",
    symbol: "AL",
    exchange: "上海期货交易所",
    contractSize: 5,
    standardCommissionRate: 3,
    standardMarginRate: 10,
    description: "基础有色金属",
  },
  {
    name: "锌",
    symbol: "ZN",
    exchange: "上海期货交易所",
    contractSize: 5,
    standardCommissionRate: 3,
    standardMarginRate: 10,
    description: "有色金属品种",
  },
  {
    name: "镍",
    symbol: "NI",
    exchange: "上海期货交易所",
    contractSize: 1,
    standardCommissionRate: 6,
    standardMarginRate: 15,
    description: "高波动有色金属",
  },
  {
    name: "黄金",
    symbol: "AU",
    exchange: "上海期货交易所",
    contractSize: 1000,
    standardCommissionRate: 10,
    standardMarginRate: 8,
    description: "贵金属，避险属性",
  },
  {
    name: "白银",
    symbol: "AG",
    exchange: "上海期货交易所",
    contractSize: 15,
    standardCommissionRate: 5,
    standardMarginRate: 10,
    description: "贵金属品种",
  },
  {
    name: "原油",
    symbol: "SC",
    exchange: "上海国际能源交易中心",
    contractSize: 1000,
    standardCommissionRate: 5, // 万分之5 = 0.05%
    standardMarginRate: 10,
    description: "国际原油，波动大",
  },
  {
    name: "燃油",
    symbol: "FU",
    exchange: "上海期货交易所",
    contractSize: 50,
    standardCommissionRate: 0.5,
    standardMarginRate: 10,
    description: "燃料油品种",
  },
  {
    name: "沥青",
    symbol: "BU",
    exchange: "上海期货交易所",
    contractSize: 10,
    standardCommissionRate: 1,
    standardMarginRate: 10,
    description: "石油沥青品种",
  },
  {
    name: "PTA",
    symbol: "TA",
    exchange: "郑州商品交易所",
    contractSize: 5,
    standardCommissionRate: 3,
    standardMarginRate: 8,
    description: "化工品种，活跃",
  },
  {
    name: "甲醇",
    symbol: "MA",
    exchange: "郑州商品交易所",
    contractSize: 50,
    standardCommissionRate: 1,
    standardMarginRate: 8,
    description: "化工品种",
  },
  {
    name: "纯碱",
    symbol: "SA",
    exchange: "郑州商品交易所",
    contractSize: 20,
    standardCommissionRate: 3,
    standardMarginRate: 9,
    description: "化工新品种",
  },
  {
    name: "玻璃",
    symbol: "FG",
    exchange: "郑州商品交易所",
    contractSize: 20,
    standardCommissionRate: 6,
    standardMarginRate: 9,
    description: "建材品种",
  },
  {
    name: "豆粕",
    symbol: "M",
    exchange: "大连商品交易所",
    contractSize: 10,
    standardCommissionRate: 1.5,
    standardMarginRate: 8,
    description: "农产品，活跃",
  },
  {
    name: "豆油",
    symbol: "Y",
    exchange: "大连商品交易所",
    contractSize: 10,
    standardCommissionRate: 1.5,
    standardMarginRate: 8,
    description: "农产品",
  },
  {
    name: "棕榈油",
    symbol: "P",
    exchange: "大连商品交易所",
    contractSize: 10,
    standardCommissionRate: 2.5,
    standardMarginRate: 10,
    description: "进口植物油",
  },
  {
    name: "玉米",
    symbol: "C",
    exchange: "大连商品交易所",
    contractSize: 10,
    standardCommissionRate: 0.6,
    standardMarginRate: 7,
    description: "基础农产品",
  },
  {
    name: "生猪",
    symbol: "LH",
    exchange: "大连商品交易所",
    contractSize: 16,
    standardCommissionRate: 4,
    standardMarginRate: 12,
    description: "活体期货，波动大",
  },
  {
    name: "白糖",
    symbol: "SR",
    exchange: "郑州商品交易所",
    contractSize: 10,
    standardCommissionRate: 3,
    standardMarginRate: 8,
    description: "软商品",
  },
  {
    name: "棉花",
    symbol: "CF",
    exchange: "郑州商品交易所",
    contractSize: 5,
    standardCommissionRate: 4,
    standardMarginRate: 8,
    description: "农产品",
  },
  {
    name: "中证1000股指",
    symbol: "IM",
    exchange: "中国金融期货交易所",
    contractSize: 200,
    standardCommissionRate: 2, // 0.02%
    standardMarginRate: 15,
    description: "小盘股指数期货",
  },
  {
    name: "沪深300股指",
    symbol: "IF",
    exchange: "中国金融期货交易所",
    contractSize: 300,
    standardCommissionRate: 2,
    standardMarginRate: 15,
    description: "大盘股指数期货",
  },
  {
    name: "上证50股指",
    symbol: "IH",
    exchange: "中国金融期货交易所",
    contractSize: 300,
    standardCommissionRate: 2,
    standardMarginRate: 15,
    description: "蓝筹股指数期货",
  },
  {
    name: "中证500股指",
    symbol: "IC",
    exchange: "中国金融期货交易所",
    contractSize: 200,
    standardCommissionRate: 2,
    standardMarginRate: 15,
    description: "中盘股指数期货",
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
