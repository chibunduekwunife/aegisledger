import Link from 'next/link'

interface AegisLogoProps {
    size: number;
}

export default function AegisLogo({ size }: AegisLogoProps) {

    return (
        <Link
            href="/">
            <h1 className={`text-${size}xl font-bold text-wine`}>
                AEGIS LEDGER
            </h1>
        </Link>
    )
}