import { adworksApi } from '@/app/store/api/adworks.api';
import { baseServiceApi } from '@/app/store/api/base-query-with-reauth';
import { chatReducer } from '@/app/store/features/chat/chat-slice';
import { dashboardReducer } from '@/app/store/features/dashboard/dashboard-slice';
import createSagaMiddleware from '@redux-saga/core';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createWebStorage from 'redux-persist/es/storage/createWebStorage';
import monitorReducerEnhancer from './monitorReducerEnhancer';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist';
import sessionStorage from 'redux-persist/es/storage/session';
import { authReducer } from "@/app/store/features/auth/auth-slice";

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const customStorage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

const authPersistConfig = {
  key: "auth",
  timeout: 100, //WORKAROUND https://github.com/rt2zz/redux-persist/issues/816
  storage: customStorage,
  whitelist: ["user"],
};

const persistentRootReducer = combineReducers({
  [adworksApi.reducerPath]: adworksApi.reducer,
  auth: persistReducer(authPersistConfig, authReducer),
  dashboard: dashboardReducer,
  chat: chatReducer,
});

export const sagaMiddleware = createSagaMiddleware()

export const makeStore = () => {
  const store = configureStore({
    reducer: persistentRootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            "persist/PERSIST",
            "persist/REHYDRATE",
            FLUSH, REHYDRATE, PAUSE,
            PERSIST, PURGE, REGISTER ],
        },
        thunk: {
          extraArgument: { baseServiceApi }
        },
      }).concat(adworksApi.middleware).concat(sagaMiddleware),
      // }).prepend(logger).concat(adworksApi.middleware).prepend(imageListenerMiddleware.middleware),
    enhancers: getDefaultEnhancers => {
      return getDefaultEnhancers({
        autoBatch: { type: 'tick' }
      }).concat(monitorReducerEnhancer as any);
    }
  });
  // sagaMiddleware.run(rootSaga);
  return store;
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
