import AegisLogo from "@/components/ui/logo"
import Link from 'next/link'
import { buttonVariants } from "@/components/ui/button"

export default function HeroSection() {
    return (
        <div>
            {/* hero section */}
            <div className="flex flex-col gap-5 items-center">
                <div className="flex flex-col text-center m-auto gap-3">
                    <AegisLogo size={5} />
                    <h2 className="text-2xl text-wine text-foreground">
                        Financially Guarded by AI, Empowered by You 🛡️
                    </h2>
                    <p className="text-muted-foreground italic">Track your finances effortlessly with voice-driven AI.
                        Log transactions, set budgets, and gain insights—naturally.</p>
                </div>
                <div className="flex flex-col w-full md:flex-row md:w-fit gap-3 md:mt-4">
                    <Link className={
                        buttonVariants({ variant: "default" })}
                        href="/login"
                    >Start Free Trial</Link>
                    <Link className={
                        buttonVariants({ variant: "outline" })}
                        href="/login"
                    >Watch Demo</Link>
                </div>
            </div>
        </div>
    )
}