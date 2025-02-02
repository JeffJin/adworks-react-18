import { useEffect, useState, useSyncExternalStore } from 'react';

export function createConnection(serverUrl: string, roomId: string) {
  // A real implementation would actually connect to the server
  let connectedCallback: ((msg: string) => void) | null = null;
  let timeout: any;
  return {
    connect() {
      timeout = setTimeout(() => {
        if (connectedCallback) {
          connectedCallback(new Date().toISOString());
        }
      }, 500);
    },
    on(event: string, callback: ((msg: string) => void) | null) {
      // if (connectedCallback) {
      //   throw Error('Cannot add the handler twice.');
      // }
      if (event !== 'connected' && event !== 'message' ) {
        throw Error('Only "connected/message" events are supported.');
      }
      connectedCallback = callback;
    },
    disconnect() {
      clearTimeout(timeout);
    }
  };
}

export function useOnlineStatusEffect() {
  // Not ideal: Manual store subscription in an Effect
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function updateState() {
      setIsOnline(navigator.onLine);
    }

    updateState();

    window.addEventListener('online', updateState);
    window.addEventListener('offline', updateState);
    return () => {
      window.removeEventListener('online', updateState);
      window.removeEventListener('offline', updateState);
    };
  }, []);
  return isOnline;
}

export function subscribe(callback: () => void) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

export function useOnlineStatus() {
  // ✅ Good: Subscribing to an external store with a built-in Hook
  return useSyncExternalStore(
    subscribe, // React won't resubscribe for as long as you pass the same function
    () => navigator.onLine, // How to get the value on the client, setIsOnline(navigator.onLine);
    () => true // How to get the value on the server, useState(true);
  );
}

