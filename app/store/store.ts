import { loginFormReducer } from '@/app/store/auth/login-form-slice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from './logger';
import monitorReducerEnhancer from './monitorReducerEnhancer';
import loggerMiddleware from './logger'
import { persistReducer, persistStore } from 'redux-persist';
import sessionStorage from 'redux-persist/es/storage/session';
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth/auth-slice";

const serviceBaseApi =  process.env.NODE_ENV !== "production"
  ? 'https://localhost:5000/' : 'https://10.0.0.102:5000/';
const rootPersistConfig = {
  key: 'root',
  storage: sessionStorage
}

const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["user"],
};

const loginFormPersistConfig = {
  key: "loginForm",
  storage: storage,
  whitelist: ["email"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  loginForm: persistReducer(loginFormPersistConfig, loginFormReducer),
});

//root persist reducer
const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
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

export const store = makeStore();

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
