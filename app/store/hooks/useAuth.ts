import { selectCurrentUser } from '@/app/store/features/auth/auth-slice';
import { useAppSelector } from '@/app/store/hooks/global';
import { useMemo } from 'react';

export const useAuth = () => {
  const user = useAppSelector(selectCurrentUser)

  return useMemo(() => ({ user }), [user])
}
