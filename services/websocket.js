// services/websocket.js
let socket = null;
let reconnectInterval = null;
let messageHandler = null;
let disconnectHandler = null;

const WS_URL = "ws://192.168.100.211:3000";
const RECONNECT_DELAY = 3000;

export function initializeWebSocket(onMessage, onDisconnect) {
  messageHandler = onMessage;
  disconnectHandler = onDisconnect;
  
  connect();
}

function connect() {
  try {
    socket = new WebSocket(WS_URL);

    socket.onopen = () => {
      console.log("✅ WebSocket Connected");
      
      // Clear reconnect interval if exists
      if (reconnectInterval) {
        clearInterval(reconnectInterval);
        reconnectInterval = null;
      }
    };

    socket.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data);
        console.log("📨 WS Message:", data.type);
        
        if (messageHandler) {
          messageHandler(data);
        }
      } catch (error) {
        console.error("❌ Error parsing WS message:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("❌ WebSocket Error:", error);
    };

    socket.onclose = () => {
      console.log("🔌 WebSocket Disconnected");
      
      if (disconnectHandler) {
        disconnectHandler();
      }
      
      // Attempt to reconnect
      if (!reconnectInterval) {
        reconnectInterval = setInterval(() => {
          console.log("🔄 Attempting to reconnect...");
          connect();
        }, RECONNECT_DELAY);
      }
    };

  } catch (error) {
    console.error("❌ WebSocket connection error:", error);
    
    // Retry connection
    setTimeout(() => {
      connect();
    }, RECONNECT_DELAY);
  }
}

export { socket };
