import Link from 'next/link';

interface AegisLogoProps {
    size: number;
    link?: string;
    onClick?: React.MouseEventHandler<HTMLHeadingElement>;
}

export default function AegisLogo({ size, link = '/', onClick }: AegisLogoProps) {
    return (
        <Link href={link}>
            <h1
                className={`text-${size}xl font-bold text-wine`}
                onClick={onClick}
                style={{ cursor: onClick ? 'pointer' : undefined }}
            >
                AEGIS LEDGER
            </h1>
        </Link>
    );
}