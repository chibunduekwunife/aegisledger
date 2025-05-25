"use client"

import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import AegisLogo from '../ui/logo'
import { useRouter } from 'next/navigation';

interface NavbarProps {
    isAuthorized: boolean | null,
    username: string
}


export function Navbar({ isAuthorized, username }: NavbarProps) {

    const router = useRouter();

    const handleLogout = () => {
        localStorage.clear();
        router.replace('/login');
    }

    return (
        <nav className='flex items-center justify-between sticky top-0 p-5 bg-secondary'>
            <AegisLogo link={isAuthorized ? '/dashboard' : '/'} size={2} />
            {isAuthorized ? (
                <div className='flex gap-5 items-center'>
                    <p className='hidden md:flex'>
                        {`Welcome, ${username}!`}
                    </p>
                    <Button
                        onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            ) : (
                <div className='flex gap-2'>
                    <Link
                        className={buttonVariants({ variant: "outline" })}
                        href={'/register'}>
                        Create Account
                    </Link>
                    <Link
                        className={buttonVariants({ variant: "default" })}
                        href={'/login'}>
                        Login
                    </Link>
                </div>
            )}
        </nav>
    )
}