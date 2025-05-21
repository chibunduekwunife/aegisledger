import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import AegisLogo from '../ui/logo'

export function MarketingNavbar() {
    return (
        <nav className='flex items-center justify-between sticky top-0 p-5 bg-secondary'>
            <AegisLogo size={2}/>
            <div className='flex gap-2'>
                <Link
                    className={buttonVariants({variant: "outline"})}
                    href={'/signup'}>
                    Create Account
                </Link>
                <Link
                    className={buttonVariants({variant: "default"})}
                    href={'/login'}>
                    Login
                </Link>
            </div>
        </nav>
    )
}