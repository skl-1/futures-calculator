import { NextRequest, NextResponse } from "next/server";
import { FetchClient, Config, HeaderUtils } from "coze-coding-dev-sdk";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: "缺少文档 URL" },
        { status: 400 }
      );
    }

    // 提取并转发请求头
    const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);

    // 创建 FetchClient
    const config = new Config();
    const client = new FetchClient(config, customHeaders);

    // 获取文档内容
    const response = await client.fetch(url);

    // 检查获取状态
    if (response.status_code !== 0) {
      return NextResponse.json(
        { error: `文档获取失败: ${response.status_message}` },
        { status: 500 }
      );
    }

    // 提取文本内容
    const textContent = response.content
      .filter((item) => item.type === "text")
      .map((item) => item.text)
      .join("\n");

    // 返回提取的内容
    return NextResponse.json({
      success: true,
      data: {
        title: response.title,
        url: response.url,
        filetype: response.filetype,
        content: textContent,
      },
    });
  } catch (error) {
    console.error("文档提取错误:", error);
    return NextResponse.json(
      { error: "文档提取失败，请稍后重试" },
      { status: 500 }
    );
  }
}
