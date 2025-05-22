
"use client"

import { useRouter } from 'next/navigation'

export function useLogout() {

  const router = useRouter();

  function handleLogout() {
    localStorage.clear();
    router.replace('/login');
  }

  return handleLogout;
}

// import { useLogout } from '@/client-actions'

// function LogoutButton() {
//   const logout = useLogout();

//   return <button onClick={logout}>Logout</button>
// }

export function useRegisterAndLogout() {
    const router = useRouter();

    function handleRegisterAndLogout() {
        localStorage.clear();
        router.replace('/signup');
    }

    return handleRegisterAndLogout;
}