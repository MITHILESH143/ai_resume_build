import { createSSEResponse, sseManager } from "@/lib/sse-manager";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return new Response("Missing userId", { status: 400 });
  }

  const stream = new ReadableStream({
    start(controller) {
      sseManager.addConnection(userId, controller);

      controller.enqueue(
        `data: ${JSON.stringify({
          type: "connected",
          timeStamp: Date.now(),
        })}\n\n`,
      );

      req.signal.addEventListener("abort", () => {
        sseManager.removeConnection(userId);
        controller.close();
      });
    },
  });

  return createSSEResponse(stream);
}
