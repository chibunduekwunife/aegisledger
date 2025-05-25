
import ProtectedRoute from "@/components/protected-route";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {

    return (
        <ProtectedRoute isProtected={false}>
            {children}
        </ProtectedRoute>
    );
}



