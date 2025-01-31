export function createConnection(serverUrl: string, roomId: string) {
  // A real implementation would actually connect to the server
  let connectedCallback: (() => void) | null = null;
  let timeout: any;
  return {
    connect() {
      timeout = setTimeout(() => {
        if (connectedCallback) {
          connectedCallback();
        }
      }, 500);
    },
    on(event: string, callback: (() => void) | null) {
      if (connectedCallback) {
        throw Error('Cannot add the handler twice.');
      }
      if (event !== 'connected') {
        throw Error('Only "connected" event is supported.');
      }
      connectedCallback = callback;
    },
    disconnect() {
      clearTimeout(timeout);
    }
  };
}
