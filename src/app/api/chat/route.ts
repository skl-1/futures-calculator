import { NextRequest } from "next/server";
import { LLMClient, Config, HeaderUtils } from "coze-coding-dev-sdk";

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    // 提取并转发请求头
    const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);

    // 创建 LLM 客户端
    const config = new Config();
    const client = new LLMClient(config, customHeaders);

    // 设置系统提示词，定义智能体的角色和能力
    const systemPrompt = `你是一个专业的期货交易助手，专门帮助用户计算和理解期货手续费和保证金。

你的主要能力包括：
1. 计算期货手续费：根据合约价值、手续费率等参数计算交易手续费
2. 计算保证金：根据合约价值、保证金率等参数计算所需保证金
3. 解释期货概念：帮助用户理解期货交易的相关概念
4. 提供交易建议：基于计算结果给出合理的交易建议

计算公式：
- 合约价值 = 价格 × 数量（手） × 合约乘数
- 手续费 = 合约价值 × 手续费率(%)
- 保证金 = 合约价值 × 保证金率(%)
- 总成本 = 保证金 + 手续费

回答时请注意：
- 语气专业友好
- 解释清晰易懂
- 如果用户询问具体计算，请引导他们使用左侧的计算器
- 如果用户提供了具体的交易参数，可以帮助计算并分析结果`;

    // 构建完整的消息历史
    const fullMessages = [
      { role: "system" as const, content: systemPrompt },
      ...(messages || []),
    ];

    // 使用流式输出
    const stream = client.stream(fullMessages, {
      model: "doubao-seed-2-0-lite-260215",
      temperature: 0.7,
      caching: "enabled",
    });

    // 创建可读流
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk.content) {
              const text = chunk.content.toString();
              // 发送 SSE 格式的数据
              const data = `data: ${JSON.stringify({ content: text })}\n\n`;
              controller.enqueue(encoder.encode(data));
            }
          }
          // 发送完成信号
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          console.error("Stream error:", error);
          controller.error(error);
        }
      },
    });

    // 返回 SSE 响应
    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "对话失败，请稍后重试" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
