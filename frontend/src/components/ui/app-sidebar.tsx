"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  ArrowRightLeft,
  BanknoteIcon,
  Bot,
  ChevronDown,
  ChevronUp,
  Coins,
  CreditCard,
  Handshake,
  HandshakeIcon,
  Home,
  LifeBuoy,
  LogOut,
  PieChart,
  PiggyBank,
  Plane,
  Plus,
  PlusCircle,
  Search,
  Settings,
  User,
  User2,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchUserInfo } from "@/api/user";
import AegisLogo from "./logo";

const app_links = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Transactions",
    url: "/dashboard/transactions",
    icon: ArrowRightLeft,
  },
  {
    title: "Add Transaction",
    url: "/dashboard/transactions/add-transaction",
    icon: PlusCircle,
  },
  {
    title: "Insights",
    url: "/dashboard/charts",
    icon: PieChart,
  },
  {
    title: "Accounts",
    url: "#",
    icon: CreditCard,
  },
  {
    title: "Budgets",
    url: "#",
    icon: PiggyBank,
  },
  {
    title: "Ask AI",
    url: "#",
    icon: Bot,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const help_links = [
  {
    title: "Support",
    url: "#",
    icon: LifeBuoy,
  },
  {
    title: "Feedback",
    url: "#",
    icon: Plane,
  },
];

export function AppSidebar() {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    fetchUserInfo().then((user) => {
      if (user && user.username) {
        setUsername(user.username);
      }
    });
  }, []);

  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.replace("/login");
  };

  return (
    <Sidebar>
      <div className="flex p-4 h-[120px] items-end border-b" style={{
        background: "var(--sidebar)"
      }}>
        <AegisLogo size={2} link="/dashboard"/>
      </div>
      <SidebarHeader />
      <SidebarContent>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Application
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {app_links.map((link) => (
                    <SidebarMenuItem key={link.title}>
                      <SidebarMenuButton asChild>
                        <Link href={link.url}>
                          <link.icon />
                          <span>{link.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Help
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {help_links.map((link) => (
                    <SidebarMenuItem key={link.title}>
                      <SidebarMenuButton asChild>
                        <Link href={link.url}>
                          <link.icon />
                          <span>{link.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      {/* footer */}
      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {username}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <Link href="/account" className="flex gap-2 items-center">
                    <User />
                    <span>Account</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="#" className="flex gap-2 items-center">
                    <Coins />
                    <span>Billing</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex gap-2 items-center text-left"
                  >
                    <LogOut />
                    <span>Sign out</span>
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
