
import ProtectedRoute from "@/components/protected-route";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/ui/app-sidebar'

export default function DashboardProtectedLayout({ children }: { children: React.ReactNode }) {

    return (
        <ProtectedRoute isProtected={true}>
            <SidebarProvider>
                <AppSidebar />
                <main className="flex-grow">
                    <SidebarTrigger />
                    {children}
                </main>
            </SidebarProvider>
        </ProtectedRoute>
    );
}



