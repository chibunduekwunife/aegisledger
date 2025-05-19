import { CardFeaturesSection } from "./features";
import HeroSection from "./hero";

export default function HomePage() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">

      {/* entire app screen */}
      <div className="flex flex-col gap-y-10 max-w-[85%] md:max-w-[70%]">
        <HeroSection />
        <CardFeaturesSection />
      </div>
    </div>
  );

}
