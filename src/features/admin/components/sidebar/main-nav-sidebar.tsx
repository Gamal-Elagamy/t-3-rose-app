"use client"
import { Link, usePathname } from "@/i18n/navigation"
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/shared/components/ui/sidebar"
import { cn } from "@/shared/lib/utils/tailwind-cn"
import { CalendarHeart, Clipboard, LayoutDashboard, Package } from "lucide-react"
import { useTranslations } from "next-intl"

const navMain = [
    {
        href: "/admin",
        key: "overview",
        icon: LayoutDashboard,
    },
    {
        href: "/admin/categories",
        key: "categories",
        icon: Clipboard,
    },
    {
        href: "/admin/occasions",
        key: "occasions",
        icon: CalendarHeart,
    },
    {
        href: "/admin/products",
        key: "products",
        icon: Package,
    },
] as const

export default function MainNavSidebar() {
    const t = useTranslations("dashboard.navMain")
    const pathname = usePathname()
    return (
        <SidebarGroup>
            <SidebarMenu className="space-y-2">
                {navMain.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <SidebarMenuItem key={item.key}>
                            <SidebarMenuButton
                                className={
                                    cn(isActive
                                        ? 'bg-maroon-50 dark:bg-soft-pink-50 text-maroon-600 hover:bg-primary'
                                        : 'hover:bg-maroon-50 dark:hover:bg-soft-pink-50 hover:text-maroon-600' , "font-bold flex items-center gap-3 transition-all")
                                }
                            >
                                <Link href={item.href} className="flex items-center gap-3">
                                    <Icon />
                                    <span>{t(item.key)}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    )
}
