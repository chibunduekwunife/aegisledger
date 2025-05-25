import Link from 'next/link'

interface AegisLogoProps {
    size: number;
    link: string;
}

export default function AegisLogo({ size, link='/' }: AegisLogoProps) {

    return (
        <Link
            href={link}>
            <h1 className={`text-${size}xl font-bold text-wine`}>
                AEGIS LEDGER
            </h1>
        </Link>
    )
}