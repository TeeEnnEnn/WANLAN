import { Outlet } from 'react-router-dom'
import { Logo } from "../components/Logo";

export function Root() {
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