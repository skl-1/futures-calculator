"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Calculator, MessageSquare, TrendingUp, TrendingDown } from "lucide-react";

// 常见期货合约预设
const contractPresets = [
  {
    name: "螺纹钢",
    symbol: "RB",
    contractSize: 10,
    commissionRate: 0.01,
    marginRate: 8,
  },
  {
    name: "原油",
    symbol: "SC",
    contractSize: 1000,
    commissionRate: 0.05,
    marginRate: 10,
  },
  {
    name: "铜",
    symbol: "CU",
    contractSize: 5,
    commissionRate: 0.05,
    marginRate: 12,
  },
  {
    name: "沪深300股指",
    symbol: "IF",
    contractSize: 300,
    commissionRate: 0.02,
    marginRate: 15,
  },
];

// 计算结果类型
interface CalculateResult {
  symbol: string;
  direction: string;
  price: number;
  quantity: number;
  contractSize: number;
  contractValue: number;
  commissionRate: number;
  commission: number;
  marginRate: number;
  margin: number;
  totalCost: number;
}

// 消息类型
interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [symbol, setSymbol] = useState("RB");
  const [price, setPrice] = useState("4000");
  const [quantity, setQuantity] = useState("1");
  const [contractSize, setContractSize] = useState("10");
  const [commissionRate, setCommissionRate] = useState("0.01");
  const [marginRate, setMarginRate] = useState("8");
  const [direction, setDirection] = useState<"long" | "short">("long");
  const [result, setResult] = useState<CalculateResult | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 应用预设合约
  const applyPreset = (preset: typeof contractPresets[0]) => {
    setSymbol(preset.symbol);
    setContractSize(preset.contractSize.toString());
    setCommissionRate(preset.commissionRate.toString());
    setMarginRate(preset.marginRate.toString());
    setResult(null);
  };

  // 执行计算
  const handleCalculate = async () => {
    try {
      const response = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol,
          price: parseFloat(price),
          quantity: parseInt(quantity),
          contractSize: parseInt(contractSize),
          commissionRate: parseFloat(commissionRate),
          marginRate: parseFloat(marginRate),
          direction,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setResult(data.data);
      } else {
        alert(data.error || "计算失败");
      }
    } catch (error) {
      console.error("计算错误:", error);
      alert("计算失败，请检查输入");
    }
  };

  // 发送消息
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: inputMessage };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) throw new Error("对话失败");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      // 添加助手消息占位
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") break;

              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  assistantContent += parsed.content;
                  setMessages((prev) => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = {
                      role: "assistant",
                      content: assistantContent,
                    };
                    return newMessages;
                  });
                }
              } catch (e) {
                // Ignore parse errors
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("对话错误:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "抱歉，对话出现错误，请稍后重试。" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto p-4 md:p-8">
        {/* 头部 */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-slate-50">
            期货手续费与保证金计算器
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            智能计算 + AI 助手，让期货交易更简单
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* 左侧：计算器 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                交易参数
              </CardTitle>
              <CardDescription>
                输入期货交易参数，快速计算手续费和保证金
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 预设合约 */}
              <div>
                <Label className="mb-2 block">快速选择合约</Label>
                <div className="flex flex-wrap gap-2">
                  {contractPresets.map((preset) => (
                    <Button
                      key={preset.name}
                      variant="outline"
                      size="sm"
                      onClick={() => applyPreset(preset)}
                    >
                      {preset.name}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* 参数输入 */}
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="symbol">合约代码</Label>
                  <Input
                    id="symbol"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    placeholder="例如: RB"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="direction">交易方向</Label>
                  <Select value={direction} onValueChange={(v: "long" | "short") => setDirection(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="long">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          做多
                        </div>
                      </SelectItem>
                      <SelectItem value="short">
                        <div className="flex items-center gap-2">
                          <TrendingDown className="h-4 w-4 text-red-500" />
                          做空
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="price">价格</Label>
                  <Input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="4000"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="quantity">数量（手）</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="1"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="contractSize">合约乘数</Label>
                  <Input
                    id="contractSize"
                    type="number"
                    value={contractSize}
                    onChange={(e) => setContractSize(e.target.value)}
                    placeholder="10"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="commissionRate">手续费率 (%)</Label>
                  <Input
                    id="commissionRate"
                    type="number"
                    step="0.01"
                    value={commissionRate}
                    onChange={(e) => setCommissionRate(e.target.value)}
                    placeholder="0.01"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="marginRate">保证金率 (%)</Label>
                  <Input
                    id="marginRate"
                    type="number"
                    step="0.1"
                    value={marginRate}
                    onChange={(e) => setMarginRate(e.target.value)}
                    placeholder="8"
                  />
                </div>

                <Button onClick={handleCalculate} className="w-full">
                  <Calculator className="mr-2 h-4 w-4" />
                  立即计算
                </Button>
              </div>

              {/* 计算结果 */}
              {result && (
                <div className="mt-6 space-y-4 rounded-lg border bg-slate-50 p-4 dark:bg-slate-900">
                  <h3 className="font-semibold">计算结果</h3>
                  <div className="grid gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">合约</span>
                      <span className="font-medium">{result.symbol} - {result.direction}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">合约价值</span>
                      <span className="font-medium">¥{result.contractValue.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">手续费 ({result.commissionRate}%)</span>
                      <span className="font-medium text-blue-600">¥{result.commission.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">保证金 ({result.marginRate}%)</span>
                      <span className="font-medium text-orange-600">¥{result.margin.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">总成本</span>
                      <span className="text-lg font-bold text-green-600">¥{result.totalCost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 右侧：智能对话 */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                AI 助手
              </CardTitle>
              <CardDescription>
                有任何问题？向 AI 期货助手提问
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
              <ScrollArea className="flex-1 h-[500px] rounded-lg border p-4">
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <div className="flex h-full items-center justify-center text-center text-sm text-slate-500">
                      <div>
                        <p className="mb-2 font-medium">你好！我是期货交易助手</p>
                        <p>我可以帮你计算手续费和保证金，解答期货交易问题</p>
                      </div>
                    </div>
                  ) : (
                    messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            message.role === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-slate-100"
                          }`}
                        >
                          <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                        </div>
                      </div>
                    ))
                  )}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="rounded-lg bg-slate-200 px-4 py-2 dark:bg-slate-700">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400"></div>
                          <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400 delay-75"></div>
                          <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400 delay-150"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="输入你的问题..."
                  disabled={isLoading}
                />
                <Button onClick={handleSendMessage} disabled={isLoading}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
