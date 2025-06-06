import { useSidebar } from "./ui/sidebar";
import AegisLogo from "./ui/logo";

export function CustomTrigger() {
    const { toggleSidebar } = useSidebar()

    return <AegisLogo size={2} onClick={toggleSidebar} />
}