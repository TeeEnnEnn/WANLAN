import { useEffect, useState } from "react"

const partyVariants = [
    'Co',
    'WAN',
    'LAN',
    'HACK',
    'WACK',
    'PARTY'
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
        <h1
            className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-pink-400 to-blue-400"
        >
            {partyVariant}.PARTY
        </h1>
    )
}