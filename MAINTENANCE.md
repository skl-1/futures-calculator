# 费率数据维护指南

## 📝 概述

本文档说明如何维护和更新期货手续费率数据。

## 🔄 更新费率数据的流程

### 方式1：自动化更新（推荐）⭐

**最简单的方式，只需3步：**

1. **在飞书更新费率数据**
   - 打开飞书文档
   - 修改费率数据
   - 确认"主力合约"标记正确

2. **导出并上传Excel**
   - 飞书文档 → 文件 → 导出 → Excel (.xlsx)
   - 保存到本地
   - 打开GitHub仓库：https://github.com/skl-1/puble
   - 上传Excel文件（替换旧的 `交易所标准.xlsx`）
   - 提交

3. **等待自动更新**
   - GitHub Actions会自动检测到Excel文件变化
   - 自动运行更新脚本
   - 自动生成并提交新的费率配置文件
   - **无需手动操作！**

**总耗时：3分钟**

---

### 方式2：使用本地脚本

如果自动更新失败，可以手动运行：

```bash
pnpm update-fees
```

脚本会自动：
1. 从GitHub克隆最新Excel文件
2. 解析Excel数据
3. 生成TypeScript配置文件
4. 更新 `src/data/feeRates.ts`

## 📊 当前费率数据统计

### 数据来源
- **GitHub仓库**：https://github.com/skl-1/puble
- **Excel文件**：交易所标准.xlsx
- **最后更新**：2026-03-09

### 覆盖品种
- **总计**：90个主力合约
- **上海期货交易所**：20个品种
- **大连商品交易所**：26个品种
- **郑州商品交易所**：25个品种
- **上海国际能源交易中心**：5个品种
- **广州期货交易所**：5个品种
- **中国金融期货交易所**：9个品种

### 费率类型
- **固定费率**：每手固定金额（如：黄金 19.99元/手）
- **按金额费率**：按合约价值百分比（如：白银 0.5‱）

## 🛠️ 故障排查

### 问题1：脚本运行失败

**症状**：运行 `pnpm update-fees` 时报错

**解决方法**：
1. 检查Python和pandas是否安装
   ```bash
   python3 --version
   python3 -c "import pandas; print(pandas.__version__)"
   ```

2. 检查GitHub仓库是否可访问
   ```bash
   git clone https://github.com/skl-1/puble.git /tmp/test
   ```

3. 查看详细错误信息
   ```bash
   pnpm update-fees 2>&1
   ```

### 问题2：提取到0个品种

**症状**：脚本运行成功，但提取到0个品种

**可能原因**：
- Excel文件格式变化
- "主力合约"标记格式改变
- 列名不一致

**解决方法**：
1. 手动检查Excel文件格式
2. 查看Python脚本中的列名是否匹配
3. 手动更新配置文件

### 问题3：TypeScript类型错误

**症状**：更新后类型检查失败

**解决方法**：
```bash
pnpm tsc --noEmit
```

查看具体错误，修正配置文件中的类型问题。

## 📋 更新检查清单

每次更新费率数据时，请确认：

- [ ] 费率数据来源可靠
- [ ] 提取的主力合约数量合理（约85-90个）
- [ ] 固定费率和按金额费率分类正确
- [ ] 保证金率数据完整
- [ ] 合约乘数数据正确
- [ ] TypeScript类型检查通过
- [ ] 测试计算功能正常

## 🧪 更新后测试

更新费率数据后，必须运行以下测试：

```bash
# 1. 类型检查
pnpm tsc --noEmit

# 2. 测试计算接口
curl -X POST http://localhost:5000/api/calculate \
  -H 'Content-Type: application/json' \
  -d '{
    "symbol": "AG2606",
    "price": 7000,
    "quantity": 10,
    "contractSize": 15,
    "commissionRate": 0.5,
    "marginRate": 22,
    "direction": "long",
    "commissionType": "percentage"
  }'
```

## 📞 联系方式

如果遇到问题，请：
1. 查看本维护文档
2. 检查GitHub Issues
3. 联系技术支持

## 📅 更新历史

| 日期 | 版本 | 更新内容 | 维护人 |
|------|------|----------|--------|
| 2026-03-09 | v1.0 | 初始版本，90个品种 | - |
