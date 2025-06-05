
import ProtectedRoute from "@/components/protected-route";

export default function DashboardProtectedLayout({ children }: { children: React.ReactNode }) {

    return (
        <ProtectedRoute isProtected={true}>
            {children}
        </ProtectedRoute>
    );
}



