import { loginFormReducer } from '@/app/store/auth/login-form-slice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth/auth-slice";

// const authPersistConfig = {
//   key: "auth",
//   storage: storage,
//   whitelist: ["user"],
// };
//
// const loginFormPersistConfig = {
//   key: "loginForm",
//   storage: storage,
//   whitelist: ["loginForm"],
// };

// const rootReducer = combineReducers({
//   auth: persistReducer(authPersistConfig, authReducer),
//   loginForm: persistReducer(loginFormPersistConfig, loginFormReducer),
// });

const rootReducer = combineReducers({
  auth: authReducer,
  loginForm: loginFormReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
