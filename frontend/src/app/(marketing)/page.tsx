import AegisLogo from "@/components/ui/logo";

export default function HomePage() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-3">
        <AegisLogo />
        <div className="flex items-center gap-2">
          <p className="text-xl text-gray-400 italic">
            Financially Guarded by AI, Empowered by You</p> 
            🛡️
        </div>
      </div>
    </div>
  );

}
