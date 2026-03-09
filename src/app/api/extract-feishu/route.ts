import { NextRequest, NextResponse } from "next/server";
import { FetchClient, Config, HeaderUtils } from "coze-coding-dev-sdk";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { error: "缺少 URL 参数" },
        { status: 400 }
      );
    }

    // 提取并转发请求头
    const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);

    // 初始化 Config 和 FetchClient
    const config = new Config();
    const client = new FetchClient(config, customHeaders);

    // 提取文档内容
    console.log("开始提取飞书文档:", url);
    const result = await client.fetch(url);

    console.log("文档提取成功:", {
      status: result.status_code,
      hasContent: result.content && result.content.length > 0,
      title: result.title,
      url: result.url,
    });

    // 提取文本内容
    const textContent = result.content
      .filter(item => item.type === 'text')
      .map(item => item.text)
      .join('\n');

    // 提取图片
    const images = result.content
      .filter(item => item.type === 'image')
      .map(item => ({
        url: item.image?.display_url,
        width: item.image?.width,
        height: item.image?.height,
      }));

    // 提取链接
    const links = result.content
      .filter(item => item.type === 'link')
      .map(item => item.url);

    return NextResponse.json({
      success: true,
      data: {
        title: result.title || "飞书文档",
        url: result.url,
        content: textContent,
        images: images,
        links: links,
        status: result.status_code,
        statusMessage: result.status_message,
        raw: result.content,
      },
    });
  } catch (error) {
    console.error("提取飞书文档失败:", error);
    return NextResponse.json(
      {
        error: "提取文档失败",
        message: error instanceof Error ? error.message : "未知错误",
      },
      { status: 500 }
    );
  }
}
