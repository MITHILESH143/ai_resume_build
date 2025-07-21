// separate utility module for server side events
import { ReadableStreamDefaultController } from "stream/web";

interface SSEData {
  type?: string;
  id?: string;
  message?: string;
}

type SSEController = ReadableStreamDefaultController<string>;

class SSEManager {
  private connections = new Map<string, SSEController>();

  addConnection(userId: string, controller: SSEController): void {
    this.connections.set(userId, controller);
  }

  removeConnection(userId: string): void {
    this.connections.delete(userId);
  }

  notifyUser(userId: string, data: SSEData): boolean {
    const controller = this.connections.get(userId);

    if (controller) {
      try {
        const message = `data: ${JSON.stringify(data)}\n\n`;
        controller.enqueue(message);
        return true;
      } catch (error) {
        console.error("Error sending SSE to user:", error);
        this.removeConnection(userId);
        return false;
      }
    }

    return false;
  }

  isConnected(userId: string): boolean {
    return this.connections.has(userId);
  }

  getConnectionCount(): number {
    return this.connections.size;
  }

  getConnectedUsers(): string[] {
    return Array.from(this.connections.keys());
  }

  closeAllConnections(): void {
    for (const [userId, controller] of this.connections.entries()) {
      try {
        controller.close();
      } catch (error) {
        console.error(`Error closing connection for user ${userId}:`, error);
      }
    }
    this.connections.clear();
  }
}

export const sseManager = new SSEManager();

// Enhanced SSE response creation with better headers
export function createSSEResponse(stream: ReadableStream<string>): Response {
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Connection": "keep-alive",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Cache-Control, Content-Type, Authorization",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    },
  });
}
