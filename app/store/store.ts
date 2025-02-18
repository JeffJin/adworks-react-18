import { dashboardReducer } from '@/app/store/auth/dashboard-slice';
import { loginFormReducer } from '@/app/store/auth/login-form-slice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from './logger';
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
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth/auth-slice";

const serviceBaseApi =  process.env.NODE_ENV !== "production"
  ? 'https://localhost:5000/' : 'https://10.0.0.102:5000/';

const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["user"],
};

const loginFormPersistConfig = {
  key: "loginForm",
  storage: sessionStorage,
  whitelist: ["email"],
};

const persistentRootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  loginForm: persistReducer(loginFormPersistConfig, loginFormReducer),
  dashboard: dashboardReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: persistentRootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            FLUSH,
            REHYDRATE,
            PAUSE,
            PERSIST,
            PURGE,
            REGISTER
          ],
        },
        thunk: {
          extraArgument: { serviceBaseApi }
        }
      }).prepend(logger),
    enhancers: getDefaultEnhancers => {
      return getDefaultEnhancers({
        autoBatch: { type: 'tick' }
      }).concat(monitorReducerEnhancer as any);
    }
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
