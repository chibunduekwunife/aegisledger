
import ProtectedRoute from "@/components/layout/protected-route";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {

    return (
        <ProtectedRoute isProtected={false}>
            {children}
        </ProtectedRoute>
    );
}



