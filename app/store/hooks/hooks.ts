import { AppDispatch, AppStore, RootState } from '@/app/store/store';
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = useStore.withTypes<AppStore>()
