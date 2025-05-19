
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

import {
    MicrophoneIcon,
    BellAlertIcon,
    BoltIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/solid'

interface FeatureProps {
    id: number;
    title: string;
    icon: React.ElementType;
    description: string;
    content?: string;
    footer?: string;
}

const features: FeatureProps[] = [
    {
        id: 1,
        title: "Speak or Type Transactions",
        icon: MicrophoneIcon,
        description: "Log expenses naturally through voice or text"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map(feature => {
                const Icon = feature.icon;
                return (
                    <Card key={feature.id}>
                        <CardHeader>
                            <div className="flex items-center">
                                <Icon className="size-6"/>
                                <CardTitle>{feature.title}</CardTitle>
                            </div>
                            <CardDescription>{feature.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>
                        <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter>
                    </Card>
                )
            })}
        </div>
    )
}