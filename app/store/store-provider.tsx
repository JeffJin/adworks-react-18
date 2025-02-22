'use client';

import { setupListeners } from '@reduxjs/toolkit/query';
import { StrictMode, useRef } from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { Persistor, PersistorOptions } from 'redux-persist/es/types';
import { PersistGate } from 'redux-persist/integration/react';
import { AppStore, makeStore } from './store';

export default function StoreProvider({ children }: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    const store = makeStore();
    storeRef.current = store;
    setupListeners(store.dispatch);
  }
  const persistor = persistStore(storeRef.current);
  return (
    <StrictMode>
      <Provider store={storeRef.current}>
        {children}
      </Provider>
    </StrictMode>
  );
}

// <PersistGate loading={null} persistor={persistor}>
//   {children}
// </PersistGate>
