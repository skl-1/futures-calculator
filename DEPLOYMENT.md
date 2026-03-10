# 期货计算器应用部署指南

## 📖 概述

本指南将帮助你将期货计算器应用部署到Vercel，并在微信公众号中配置自定义菜单，让用户可以通过公众号直接使用应用。

---

## 🚀 部署步骤

### 步骤1：部署应用到Vercel

#### 1.1 注册/登录Vercel

1. 访问：https://vercel.com
2. 使用GitHub、GitLab或Bitbucket账号登录
3. 完成注册流程

#### 1.2 创建新项目

1. 登录后，点击 "Add New..." → "Project"
2. 在 "Import Git Repository" 中，选择你的GitHub仓库
3. 仓库名称：`futures-calculator`
4. 点击 "Import"

#### 1.3 配置项目

在 "Configure Project" 页面：

**Framework Preset:**
- 自动检测为 "Next.js"

**Build & Development Settings:**
- Build Command: `pnpm run build`
- Output Directory: `.next`
- Install Command: `pnpm install`

**Environment Variables（环境变量）：**
如果项目需要环境变量，在这里添加：
- 例如：`NEXT_PUBLIC_API_KEY=your_api_key`

#### 1.4 部署

1. 点击 "Deploy" 按钮
2. 等待构建完成（约2-3分钟）
3. 部署成功后，Vercel会生成一个URL，例如：
   - `https://futures-calculator.vercel.app`

#### 1.5 获取部署URL

部署成功后，Vercel会显示：
- **Production URL**: `https://futures-calculator.vercel.app`
- 复制这个URL，用于下一步配置微信公众号

**注意：** 如果Vercel检测到域名冲突，可能会生成不同的URL，请复制实际的URL。

---

### 步骤2：配置微信公众号

#### 2.1 登录微信公众平台

1. 访问：https://mp.weixin.qq.com
2. 使用公众号管理员账号登录
3. 确保账号有"自定义菜单"配置权限

#### 2.2 进入自定义菜单

1. 在左侧菜单中，找到 "内容与互动"
2. 点击 "自定义菜单"
3. 进入菜单配置页面

#### 2.3 添加菜单

1. 点击 "添加菜单" 按钮
2. 配置菜单信息：

**基本信息：**
- **菜单名称**: `期货计算器`
  - （或你喜欢的名字，如"费率查询"、"手续费计算"等）
- **菜单类型**: 选择 "跳转网页"

**页面地址：**
- **页面地址**: 输入你的应用URL
  - 例如：`https://futures-calculator.vercel.app`
  - 确保URL可以正常访问

#### 2.4 保存并发布

1. 点击 "保存并发布" 按钮
2. 等待系统提示 "发布成功"
3. 菜单配置完成

---

### 步骤3：测试

#### 3.1 在微信中测试

1. 打开手机微信
2. 搜索并进入你的公众号
3. 点击 "期货计算器" 菜单
4. 确认是否自动跳转到应用页面

#### 3.2 验证功能

1. 在应用中测试费率计算功能
2. 确认页面加载正常
3. 确认所有功能可以正常使用

---

## 📋 部署检查清单

在部署完成后，请检查以下项目：

- [ ] Vercel部署成功，可以访问应用URL
- [ ] 应用URL可以在微信中正常打开
- [ ] 公众号菜单配置完成
- [ ] 点击菜单可以正确跳转到应用
- [ ] 应用功能测试正常
- [ ] 页面加载速度正常
- [ ] 移动端显示正常

---

## 🔧 常见问题

### Q1: Vercel部署失败

**可能原因：**
- GitHub仓库权限不足
- 依赖安装失败
- 构建命令错误

**解决方案：**
1. 检查GitHub仓库是否公开
2. 确认`package.json`中的脚本配置正确
3. 查看Vercel部署日志，查看具体错误信息

### Q2: 公众号菜单点击无反应

**可能原因：**
- 菜单未发布
- 页面地址错误
- 微信安全策略拦截

**解决方案：**
1. 确认菜单已点击 "保存并发布"
2. 检查页面地址是否正确（复制完整的URL）
3. 确认URL使用HTTPS协议
4. 在微信中直接访问URL测试

### Q3: 页面在微信中无法访问

**可能原因：**
- URL被微信安全系统拦截
- 域名未备案（如果使用自定义域名）
- 页面加载时间过长

**解决方案：**
1. 使用Vercel生成的默认URL（`*.vercel.app`）
2. 优化页面加载速度
3. 确认域名已备案（如果使用自定义域名）

### Q4: 应用功能异常

**可能原因：**
- 环境变量未配置
- API接口未部署
- 数据加载失败

**解决方案：**
1. 检查Vercel中的环境变量配置
2. 查看浏览器控制台的错误信息
3. 检查API接口是否可访问

---

## 📱 微信公众号配置截图说明

### 自定义菜单配置位置

```
微信公众平台后台
  └─ 内容与互动
      └─ 自定义菜单
          └─ 添加菜单
              ├─ 菜单名称: 期货计算器
              ├─ 菜单类型: 跳转网页
              └─ 页面地址: https://futures-calculator.vercel.app
```

---

## 🎯 下一步

部署完成后，你可以：

1. **监控应用性能**
   - 使用Vercel Analytics查看访问统计
   - 监控页面加载速度

2. **优化用户体验**
   - 根据用户反馈优化界面
   - 添加更多功能

3. **推广应用**
   - 在公众号中发布使用教程
   - 鼓励用户分享

---

## 📞 技术支持

如果遇到问题，可以：

1. 查看[Vercel官方文档](https://vercel.com/docs)
2. 查看[微信公众平台文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Custom_Menus.html)
3. 联系开发者获取支持

---

## 📄 相关文档

- [Vercel部署文档](https://vercel.com/docs/deployments/overview)
- [Next.js部署文档](https://nextjs.org/docs/deployment)
- [微信公众号自定义菜单文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Custom_Menus.html)

---

**祝你部署成功！🎉**
