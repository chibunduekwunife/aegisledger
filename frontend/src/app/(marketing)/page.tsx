import DemoSection from "./components/demo";
import { CardFeaturesSection } from "./components/features";
import HeroSection from "./components/hero";
import PricingSection from "./components/pricing";

export default function HomePage() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">

      {/* Hero */}
      <div className="flex flex-col gap-y-10 max-w-[85%] md:max-w-[70%] my-15 md:my-20">
        <HeroSection />
        <CardFeaturesSection />
      </div>
      <div className="flex flex-col bg-secondary w-full items-center">
        <div className="flex flex-col gap-y-10 w-full max-w-[90%] md:max-w-[65%] my-10 md:my-15">
          <DemoSection />
        </div>
      </div>
      <div className="max-w-[85%] md:max-w-[70%] my-15 md:my-20">
        <PricingSection />
      </div>
    </div>
  );

}
