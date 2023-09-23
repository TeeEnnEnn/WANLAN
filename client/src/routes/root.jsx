import { Outlet } from 'react-router-dom'
import { Logo } from "../components/Logo";
import { useEffect } from 'react';

export function Root() {
    useEffect(() => {
        const userId = window.localStorage.getItem('user_id')
        if (!userId) {
            window.localStorage.setItem('user_id', crypto.randomUUID())
        }
    }, [])
    return (
        <div
            className="container mx-auto"
        >
            <header className='py-2'>
                <Logo />
            </header>
            <Outlet />
        </div>
    )
}