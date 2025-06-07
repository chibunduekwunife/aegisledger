"use client"
import ProtectedRoute from "@/components/protected-route";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/ui/app-sidebar'
import { useState } from "react";
import { CustomTrigger } from "@/components/custom-sidebar-trigger";

export default function DashboardProtectedLayout({ children }: { children: React.ReactNode }) {

    const [open, setOpen] = useState(true)

    return (
        <ProtectedRoute isProtected={true}>
            <SidebarProvider open={open} onOpenChange={setOpen}>
                <AppSidebar />
                <main className="flex-grow">
                    <div className="ml-5 mt-8">
                        <CustomTrigger isOpen={open} />
                    </div>
                    {children}
                </main>
            </SidebarProvider>
        </ProtectedRoute>
    );
}



