import { Client } from '@stomp/stompjs';
import type { IMessage } from '@stomp/stompjs';
import SockJS from "sockjs-client";

let stompClient: Client | null = null;

export const connect = (
  url: string,
  onMessageReceived: (message: any) => void
): void => {
  const socket = new SockJS(url);

  stompClient = new Client({
    webSocketFactory: () => socket,
    debug: (str) => console.log(str), // Log thông tin debug
    onConnect: () => {
      console.log("Connected to WebSocket");

      // Subscribe to the topic
      stompClient?.subscribe("/topic/messages", (message: IMessage) => {
        if (onMessageReceived) {
          onMessageReceived(JSON.parse(message.body));
        }
      });
    },
    onStompError: (frame) => {
      console.error("WebSocket Error:", frame.headers["message"]);
      console.error("Details:", frame.body);
    },
  });

  stompClient.activate();
};

export const sendMessage = (destination: string, message: any): void => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination,
      body: JSON.stringify(message),
    });
  } else {
    console.error("WebSocket is not connected");
  }
};

export const disconnect = (): void => {
  if (stompClient) {
    stompClient.deactivate();
    console.log("Disconnected from WebSocket");
  }
};
