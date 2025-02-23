import { useSyncExternalStore } from 'react';

export function useOnlineStatus() {
  // ✅ Good: Subscribing to an external store with a built-in Hook
  return useSyncExternalStore(
    subscribeOnlineStatus, // React won't resubscribe for as long as you pass the same function
    () => navigator.onLine, // How to get the value on the client, client snapshot;
    () => true // How to get the value on the server, server snapshot;
  );
}


export function subscribeOnlineStatus(callback: () => void) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}
