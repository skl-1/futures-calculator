/**
 * 费率数据更新脚本
 * 
 * 功能：从GitHub仓库拉取Excel文件，提取主力合约费率，更新配置文件
 * 
 * 使用方法：
 *   pnpm update-fees
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// 配置
const GITHUB_REPO = 'https://github.com/skl-1/puble.git';
const EXCEL_FILE = '交易所标准.xlsx';
const OUTPUT_FILE = path.join(__dirname, '../src/data/feeRates.ts');

console.log('🔄 开始更新费率数据...');
console.log(`📍 仓库: ${GITHUB_REPO}`);
console.log(`📄 文件: ${EXCEL_FILE}`);
console.log(`💾 输出: ${OUTPUT_FILE}\n`);

try {
  // 1. 克隆GitHub仓库
  console.log('📥 步骤1/4: 从GitHub克隆最新数据...');
  const tempDir = '/tmp/puble';
  if (fs.existsSync(tempDir)) {
    execSync(`rm -rf ${tempDir}`);
  }
  execSync(`git clone ${GITHUB_REPO} ${tempDir}`);
  console.log('✅ 克隆完成\n');

  // 2. 创建Python解析脚本
  console.log('📊 步骤2/4: 创建Python解析脚本...');
  const excelPath = path.join(tempDir, EXCEL_FILE);
  
  if (!fs.existsSync(excelPath)) {
    throw new Error(`Excel文件不存在: ${excelPath}`);
  }

  const pythonScriptPath = '/tmp/parse_fees.py';
  const pythonScript = `
import pandas as pd
import json
import re
import sys

try:
    # 读取Excel文件
    df = pd.read_excel('${excelPath}')
    df.columns = ['合约品种', '保证金%', '开仓手续费', '开昨手续费', '平今手续费', '备注']
    
    # 过滤数据
    df = df[df['合约品种'].notna()]
    df = df[df['合约品种'] != '合约品种']
    
    # 重置索引，使其从0开始
    df = df.reset_index(drop=True)
    
    # 识别交易所边界
    exchange_boundaries = [
        {'name': '上海期货交易所', 'start': 0, 'end': 236},
        {'name': '大连商品交易所', 'start': 236, 'end': 487},
        {'name': '郑州商品交易所', 'start': 487, 'end': 760},
        {'name': '广州期货交易所', 'start': 760, 'end': 806},
        {'name': '中国金融期货交易所', 'start': 806, 'end': None},
    ]
    
    def get_exchange(idx):
        for boundary in exchange_boundaries:
            if boundary['end'] is None:
                if idx >= boundary['start']:
                    return boundary['name']
            else:
                if boundary['start'] <= idx < boundary['end']:
                    return boundary['name']
        return '未知交易所'
    
    df['交易所'] = df.index.map(get_exchange)
    
    # 合约乘数映射
    contract_sizes = {
        'AG': 15, 'AU': 1000, 'SN': 1, 'CU': 5, 'NI': 1, 'AL': 5, 'PB': 5, 'ZN': 5,
        'AO': 20, 'WR': 10, 'SS': 5, 'AD': 5, 'RB': 10, 'HC': 10, 'BU': 10,
        'FU': 50, 'BR': 10, 'RU': 10, 'SP': 10, 'OP': 10,
        'Y': 10, 'P': 10, 'A': 10, 'B': 10, 'M': 10, 'C': 10, 'CS': 10, 'RR': 10,
        'JD': 10, 'L': 5, 'PP': 5, 'V': 5, 'EG': 10, 'PG': 20, 'EB': 10, 'I': 100,
        'JM': 60, 'J': 100, 'LH': 16, 'FB': 10, 'BB': 10, 'LG': 90,
        'TA': 5, 'MA': 50, 'SA': 20, 'FG': 20, 'SR': 10, 'CF': 5, 'CY': 5,
        'OI': 10, 'RM': 10, 'RS': 10, 'UR': 20, 'SF': 5, 'SM': 5, 'PK': 5,
        'AP': 10, 'CJ': 10, 'PTA': 5, 'PF': 5, 'PR': 5, 'SH': 20, 'PX': 5,
        'SC': 1000, 'LU': 10, 'NR': 10, 'BC': 5,
        'SI': 5, 'LC': 1, 'PS': 50,
        'TS': 20000, 'TF': 10000, 'T': 10000, 'TL': 10000,
        'IF': 300, 'IC': 200, 'IH': 300, 'IM': 200, 'PD': 1, 'PT': 1,
    }
    
    def parse_commission(fee_text):
        if pd.isna(fee_text):
            return None, None
        fee_text = str(fee_text).strip()
        
        if '元' in fee_text:
            match = re.search(r'([\\d.]+)元', fee_text)
            if match:
                return ('fixed', float(match.group(1)))
        elif '万分之' in fee_text:
            match = re.search(r'([\\d.]+)/万分之', fee_text)
            if match:
                return ('percentage', float(match.group(1)))
        
        # 尝试纯数字（如果没有单位，假设是按金额）
        if fee_text.replace('.', '').isdigit():
            return ('fixed', float(fee_text))
        
        return None, None
    
    def extract_symbol_info(contract_name):
        text = str(contract_name)
        match = re.search(r'^([A-Za-z]+)\\D*(\\d{4})', text)
        if match:
            return match.group(1).upper(), match.group(2)
        match = re.search(r'^([A-Za-z]+)\\D*(\\d{3})', text)
        if match:
            return match.group(1).upper(), "26" + match.group(2)
        return None, None
    
    # 提取主力合约
    main_contracts = df[df['备注'] == '主力合约'].copy()
    
    fee_configs = []
    
    for idx, row in main_contracts.iterrows():
        contract_name = row['合约品种']
        exchange = row['交易所']
        margin_rate = row['保证金%']
        open_fee = row['开仓手续费']
        
        commission_type, commission_value = parse_commission(open_fee)
        if not commission_type:
            continue
        
        base_symbol, delivery_month = extract_symbol_info(contract_name)
        if not base_symbol:
            continue
        
        symbol_code = base_symbol + delivery_month
        contract_size = contract_sizes.get(base_symbol, 1)
        margin_percent = margin_rate * 100 if isinstance(margin_rate, (int, float)) else float(margin_rate)
        
        config = {
            'name': contract_name,
            'symbol': symbol_code,
            'base_symbol': base_symbol,
            'exchange': exchange,
            'contractSize': contract_size,
            'commissionType': commission_type,
            'standardCommissionRate': commission_value if commission_type == 'percentage' else 0,
            'fixedCommissionPerLot': commission_value if commission_type == 'fixed' else 0,
            'standardMarginRate': round(margin_percent, 2),
            'deliveryMonth': delivery_month,
            'description': f"{exchange}主力合约"
        }
        fee_configs.append(config)
    
    # 输出JSON
    print(json.dumps(fee_configs, ensure_ascii=False))
    
except Exception as e:
    print(f"ERROR: {str(e)}", file=sys.stderr)
    sys.exit(1)
`;

  fs.writeFileSync(pythonScriptPath, pythonScript, 'utf-8');
  console.log('✅ Python脚本创建完成\n');
  
  // 3. 执行Python脚本解析数据
  console.log('📊 步骤3/4: 解析Excel数据...');
  const pythonResult = execSync(`python3 ${pythonScriptPath}`, { encoding: 'utf-8' });
  
  if (pythonResult.startsWith('ERROR:')) {
    throw new Error(pythonResult);
  }
  
  const feeConfigs = JSON.parse(pythonResult);
  console.log(`✅ 解析完成，提取到 ${feeConfigs.length} 个主力合约\n`);

  // 4. 生成TypeScript配置文件
  console.log('📝 步骤5/5: 生成TypeScript配置文件...');
  
  const tsContent = generateTypeScriptConfig(feeConfigs);
  fs.writeFileSync(OUTPUT_FILE, tsContent, 'utf-8');
  console.log('✅ 配置文件生成完成\n');

  // 5. 统计信息
  console.log('📈 统计信息:');
  const stats: {
    total: number;
    byExchange: Record<string, number>;
    fixed: number;
    percentage: number;
  } = {
    total: feeConfigs.length,
    byExchange: {},
    fixed: 0,
    percentage: 0
  };
  
  feeConfigs.forEach((config: any) => {
    stats.byExchange[config.exchange] = (stats.byExchange[config.exchange] || 0) + 1;
    if (config.commissionType === 'fixed') {
      stats.fixed++;
    } else {
      stats.percentage++;
    }
  });
  
  console.log(`  总计品种: ${stats.total}个`);
  console.log(`  固定费率: ${stats.fixed}个`);
  console.log(`  按金额费率: ${stats.percentage}个`);
  console.log('\n  各交易所分布:');
  Object.entries(stats.byExchange).forEach(([exchange, count]) => {
    console.log(`    ${exchange}: ${count}个`);
  });
  
  // 6. 清理临时文件
  console.log('\n🧹 清理临时文件...');
  execSync(`rm -rf ${tempDir} ${pythonScriptPath}`);
  console.log('✅ 清理完成\n');
  
  console.log('🎉 费率数据更新完成！');
  console.log(`💡 下一步: 运行 pnpm tsc --noEmit 检查类型\n`);
  
} catch (error) {
  console.error('\n❌ 更新失败:', error);
  process.exit(1);
}

/**
 * 生成TypeScript配置文件内容
 */
function generateTypeScriptConfig(feeConfigs: any[]): string {
  const imports = `// 标准期货手续费率和保证金率配置
// 数据来源：GitHub https://github.com/skl-1/puble/blob/main/交易所标准.xlsx
// 提取时间：${new Date().toLocaleDateString('zh-CN')}
// 覆盖品种：${feeConfigs.length}个主力合约

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
`;

  const configsArray = JSON.stringify(feeConfigs, null, 2)
    .replace(/"commissionType": "(fixed|percentage)"/g, (match, type) => 
      `"commissionType": CommissionType.${type.toUpperCase()}`
    );

  const configs = `
export const standardFeeRates: StandardFeeRate[] = ${configsArray};
`;

  const helperFunctions = `
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
`;

  return imports + configs + helperFunctions;
}
