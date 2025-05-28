import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    id: 1,
    title: "Free",
    description: "free plan",
    price: 0,
    perks: ["Basic tracking", "1 budget", "50 transactions/month"],
  },
  {
    id: 2,
    title: "Basic",
    description: "everyting in free tier included*",
    price: 9.99,
    perks: ["10 AI insights/month", "10 budgets", "500 transactions/month"],
  },
  {
    id: 3,
    title: "Premium",
    description: "everyting in basic tier included*",
    price: 19.99,
    perks: ["Unlimited AI insights", "Unlimited budgets", "CSV exports"],
  },
];

export default function PricingSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
      {tiers.map((tier) => (
        <Card
          key={tier.id}
          className="flex flex-col h-full w-full max-w-2xl min-h-[420px] mx-auto p-8"
        >
          <CardHeader className="items-center text-center">
            <CardTitle>{tier.title}</CardTitle>
            <CardDescription>{tier.description}</CardDescription>
          </CardHeader>
          <div className="border-b-2"></div>
          <CardContent className="flex flex-col flex-1 items-center justify-center gap-4">
            <div className="flex items-baseline justify-center gap-1">
              <h1 className="text-4xl font-bold">{`$${tier.price}`}</h1>
              <p className="text-base">/month</p>
            </div>
            <ul className="space-y-2 text-center">
              {tier.perks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="flex justify-center mt-auto">
            <Button type="submit" className="w-full max-w-xs">
              Get Started
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
