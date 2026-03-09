// 标准期货手续费率和保证金率配置
// 数据来源：GitHub https://github.com/skl-1/puble/blob/main/交易所标准.xlsx
// 提取时间：2026/3/9
// 覆盖品种：0个主力合约

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

export const standardFeeRates: StandardFeeRate[] = [];

// 辅助函数：根据合约代码查找费率
export const getStandardFeeRate = (symbol: string): StandardFeeRate | undefined => {
  // 不区分大小写查找，并支持模糊匹配（如 RB 可以匹配 RB2605）
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
