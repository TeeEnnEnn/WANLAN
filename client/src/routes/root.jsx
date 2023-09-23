import { Outlet, useLocation } from 'react-router-dom'
import { Logo } from "../components/Logo";
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion'

export function Root() {
    const location = useLocation()
    useEffect(() => {
        const userId = window.localStorage.getItem('user_id')
        if (!userId) {
            window.localStorage.setItem('user_id', crypto.randomUUID())
        }
    }, [])
    return (
        <AnimatePresence mode='wait'>
            <div
                className="container mx-auto"
            >
                <header className='py-2'>
                    <Logo />
                </header>
                <motion.div
                    key={location.pathname}
                    initial={{ y: 10, opacity: 0, }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <Outlet />
                </motion.div>
            </div>
        </AnimatePresence>
    )
}