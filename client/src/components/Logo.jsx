import { useEffect, useState } from "react"
import logo from '../assets/logo.png'
import { Link } from "react-router-dom"

const partyVariants = [
    'Co',
    'WAN',
    'LAN',
    'HACK',
    'WACK',
    'PARTY',
    "JR",
    "AUSTIN",
    "CYRIL",
    "THEO"
]

export function Logo() {
    const [partyVariant, setPartyVariant] = useState(partyVariants[0])
    useEffect(() => {
        let handle = setInterval(() => {
            setPartyVariant(partyVariants[Math.floor(Math.random() * partyVariants.length)])
        }, 5000)
        return () => {
            clearInterval(handle)
        }
    }, [])
    return (
        <div className="flex flex-row items-center gap-4">
            <img src={logo} width={64} height={64} className="object-cover rounded-full transition-all" alt="Cyrill" />
            <Link to='/'>
                <h1
                    className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-pink-400 to-blue-400"
                >
                    {partyVariant}.PARTY
                </h1>
            </Link>
        </div>
    )
}