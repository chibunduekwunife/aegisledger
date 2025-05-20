import Image from "next/image";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface FeatureProps {
    id: number;
    title: string;
    description: string;
    imageSrc: string | StaticImport;
    content?: string;
    footer?: string;
}

const features: FeatureProps[] = [
    {
        id: 1,
        title: "Speak or Type Transactions",
        description: "Log expenses naturally through voice or text",
        imageSrc: "/images/credit-card.svg"
    },
    {
        id: 2,
        title: "Real-Time Budget Alerts",
        description: "Stay on track with intelligent notifications",
        imageSrc: "/images/inbox.svg"
    }, {
        id: 3,
        title: "AI-Powered Insights",
        description: "Get personalized financial recommendations",
        imageSrc: "/images/data-trends.svg"
    },{
        id: 4,
        title: "Bank-Grade Security",
        description: "Your data is encrypted and secure",
        imageSrc: "/images/enter-password.svg"
    }
]


export function CarouselFeaturesSection() {
    return (
        <Carousel>
            <CarouselContent>
                <CarouselItem>...</CarouselItem>
                <CarouselItem>...</CarouselItem>
                <CarouselItem>...</CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>

    )
}

export function CardFeaturesSection() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            {features.map(feature => {
                
                return (
                    <Card key={feature.id}>
                        <CardContent className="flex justify-center items-center">
                            <Image
                                src={feature.imageSrc}
                                width={100}
                                height={100}
                                alt={feature.title}/>
                        </CardContent>
                        <CardHeader>
                            <CardTitle>{feature.title}</CardTitle>
                            <CardDescription>{feature.description}</CardDescription>
                        </CardHeader>
                    </Card>
                )
            })}
        </div>
    )
}