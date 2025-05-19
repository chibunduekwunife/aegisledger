interface AegisLogoProps {
    size: number;
}

export default function AegisLogo({size}: AegisLogoProps) {

    return (
        <h1 className={`text-${size}xl font-bold text-wine`}>
            AEGIS LEDGER
        </h1>
    )
}