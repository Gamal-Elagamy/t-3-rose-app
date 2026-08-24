"use client"
import { Logo } from "@/features/header/components/shared/logo";
import { usePathname } from "@/i18n/navigation";
import { SidebarTrigger } from "@/shared/components/ui/sidebar";
import UserMenu from "./user-menu";
import { IUser } from "@/shared/lib/types/user";



export function SiteHeader({user} :{user:IUser}) {
    const pathName = usePathname()
    return (
        <header className="flex  shrink-0 items-center gap-2  bg-white dark:bg-zinc-800 py-2">
            <div className="flex w-full items-center justify-between gap-1 py-2 px-4 lg:gap-2">
                <div className="flex gap-2 items-center">
                    <Logo width={60} height={57} href="/admin" className="md:hidden" />
                    <p className="text-sm md:text-base">{pathName.split("/")[1].slice(0, 1).toLocaleUpperCase()}{pathName.split("/")[1].slice(1)}</p>
                </div>
                <div className="flex items-center gap-1 md:hidden">
                    <UserMenu user={user} />
                    <SidebarTrigger className="-ml-1 bg-transparent p-0 hover:bg-transparent text-zinc-700 dark:text-white " />
                </div>
            </div>
        </header>
    )
}