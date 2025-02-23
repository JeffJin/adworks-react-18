import { useSyncExternalStore } from 'react';

const LOGIN_FORM_EMAIL_STORAGE_KEY = "login-form-email-key";
const LOGIN_FORM_REMEMBER_STORAGE_KEY = "login-form-remember-key";
const getEmailFromLocalStorage = (): string => {
  return localStorage.getItem(LOGIN_FORM_EMAIL_STORAGE_KEY) || '';
};

const getRememberMeFromLocalStorage = (): string => {
  return localStorage.getItem(LOGIN_FORM_REMEMBER_STORAGE_KEY) || 'false';
};

const subscribeLoginEmailStorage = (callback: () => void): (() => void) => {
  window.addEventListener("email_storage", callback);
  return () => {
    window.removeEventListener("email_storage", callback);
  };
};

const subscribeLoginRememberMeStorage = (callback: () => void): (() => void) => {
  window.addEventListener("remember_storage", callback);
  return () => {
    window.removeEventListener("remember_storage", callback);
  };
};

const getServerSnapshot = () => {
  return '';
}

export const useLoginEmailStore = (): [string, (newEmail: string) => void] => {
  const loginEmail = useSyncExternalStore(
    subscribeLoginEmailStorage,
    getEmailFromLocalStorage,
    getServerSnapshot
  );

  const setLoginEmail = (newEmail: string) => {
    localStorage.setItem(LOGIN_FORM_EMAIL_STORAGE_KEY, newEmail);
    window.dispatchEvent(new Event("email_storage"));
  };

  return [loginEmail, setLoginEmail];
};

export const useLoginRememberMeStore = (): [string, (newVal: string) => void] => {
  const rememberMe = useSyncExternalStore(
    subscribeLoginRememberMeStorage,
    getRememberMeFromLocalStorage,
    getServerSnapshot
  );

  const setRememberMe = (newVal: string) => {
    localStorage.setItem(LOGIN_FORM_REMEMBER_STORAGE_KEY, newVal);
    window.dispatchEvent(new Event("remember_storage"));
  };

  return [rememberMe, setRememberMe];
};

