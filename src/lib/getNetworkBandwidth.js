/*
 * Establishes a persistent connection to the Python backend stream.
 * @param {Function} onDataCallback - Callback executed every time new WAN speeds arrive.
 * @param {Function} onStatusChange - Optional callback to track connection status (connected, disconnected).
 * @returns {Function} A cleanup function to close the socket manually when the component unmounts.
 */
export function streamWanSpeeds(onDataCallback, onStatusChange = () => {}) {
  let ws = null;
  let retryDelay = 2000; // Start with a 2-second reconnect delay
  const maxRetryDelay = 30000; // Cap backoff at 30 seconds
  let isExplicitlyClosed = false;

  function connect() {
    if (isExplicitlyClosed) return;

    // Connect to your Python FastAPI backend
    ws = new WebSocket('ws://localhost:8000/ws/wan-speed');
    onStatusChange('connecting');

    ws.onopen = () => {
      onStatusChange('connected');
      retryDelay = 2000; // Reset backoff delay on successful connection
    };

    ws.onmessage = (event) => {
      try {
        const interfaces = JSON.parse(event.data);
        onDataCallback(interfaces);
      } catch (error) {
        console.error('Failed to parse incoming WebSocket data:', error);
      }
    };

    ws.onclose = (event) => {
      onStatusChange('disconnected');
      
      // If we didn't call the disconnect cleanup function, attempt auto-reconnect
      if (!isExplicitlyClosed) {
        console.warn(`WebSocket closed (${event.reason || 'No reason specified'}). Reconnecting in ${retryDelay / 1000}s...`);
        setTimeout(() => {
          // Exponential backoff
          retryDelay = Math.min(retryDelay * 2, maxRetryDelay);
          connect();
        }, retryDelay);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket encountered an error:', error);
      ws.close(); // Force trigger onclose logic to handle reconnects smoothly
    };
  }

  // Start the initial connection execution loop
  connect();

  // Return a teardown function. Vue components must call this on unmount to prevent leaks.
  return function disconnect() {
    isExplicitlyClosed = true;
    if (ws) {
      ws.close();
    }
  };
}
