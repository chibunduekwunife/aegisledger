"use client"

import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'
import api from '@/api'
import { REFRESH_TOKEN, ACCESS_TOKEN } from '@/constants'
import { useState, useEffect } from 'react'


export default function DashboardProtectedLayout({ children }: { children: React.ReactNode }) {

    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    // as soon as we call our protected routes, we check authorization

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    useEffect(() => {
        if (isAuthorized === false) {
            router.replace('/login');
        }
    }, [isAuthorized, router]);


    const refreshToken = async () => {

        const refreshToken = localStorage.getItem(REFRESH_TOKEN)

        try {

            //res should = our newly refreshed access token

            const res = await api.post('/api/token/refresh/', {
                refresh: refreshToken
            })

            if (res.status == 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }

        } catch (error) {
            console.log(error)
            setIsAuthorized(false)
        }
    }

    const auth = async () => {

        const token = localStorage.getItem(ACCESS_TOKEN)

        if (!token) {
            setIsAuthorized(false)
            return
        }

        const decoded = jwtDecode<{ exp?: number }>(token)
        const tokenExpiration = decoded.exp

        if (!tokenExpiration) {
            setIsAuthorized(false);
            return;
        }

        const now = Date.now() / 1000 // day in seconds

        if (tokenExpiration < now) {
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }
    }

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    if (!isAuthorized) {
        return null;
    }

    return <>{children}</>;
}



