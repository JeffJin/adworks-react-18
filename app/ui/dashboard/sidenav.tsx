'use client';
import { useLogoutMutation } from '@/app/lib/services/adworks.api';
import { authActions } from '@/app/store/features/auth/auth-slice';
import { useAppDispatch } from '@/app/store/hooks/global';
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AdworksLogo from "@/app/ui/common/adworks-logo";
import { useRouter } from 'next/navigation';

export default function SideNav() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logout, { isLoading, isError, isSuccess, data }] = useLogoutMutation();
  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(authActions.logoutSuccess());
      router.push('/login');
    } catch (error) {
      // handle login error
      console.error(error);
    }
  }

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-center rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <AdworksLogo />
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <Link
          href="/chat">
          <button
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <ChatBubbleOvalLeftIcon className="w-6"/>
            <div className="hidden md:block">Live Chat</div>
          </button>
        </Link>
        <button
          onClick={handleLogout}
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
          <ChatBubbleOvalLeftIcon className="w-6"/>
          <div className="hidden md:block">Logout</div>
        </button>
      </div>
    </div>
  );
}
