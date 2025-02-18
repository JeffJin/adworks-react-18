import { AppDispatch, AppStore, RootState } from '@/app/store/store';
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
