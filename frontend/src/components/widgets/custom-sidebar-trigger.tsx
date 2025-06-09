import { useSidebar } from "../ui/sidebar";
import { Button } from "../ui/button";
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react";

interface CustomTriggerProps {
    isOpen: boolean;
}

export function CustomTrigger({ isOpen }: CustomTriggerProps) {
    const { toggleSidebar } = useSidebar()

    return (
        <Button
            variant="outline"
            onClick={toggleSidebar}>
                { isOpen ? <PanelLeftCloseIcon /> : <PanelLeftOpenIcon /> }
                { isOpen ? 'Close Sidebar' : 'Open Sidebar' }
        </Button>
    )
}