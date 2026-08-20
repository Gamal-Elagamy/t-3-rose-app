import { Logo } from '@/features/header/components/shared/logo'
import { Link } from '@/i18n/navigation'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/shared/components/ui/sidebar'
import { Flower } from 'lucide-react'
import { getLocale } from 'next-intl/server'
import MainNavSidebar from './main-nav-sidebar'
import UserMenu from './user-menu'
import { IUser } from '@/shared/lib/types/user'



export default async function AdminAppSidebar({user} :{user:IUser}) {
    const locale = await getLocale()
    return (
        <Sidebar side={locale === "ar" ? "right" : "left"} collapsible="icon" className='border-none bg-white dark:bg-zinc-800' >
            <SidebarHeader>
                <Logo className='justify-center ' href='/admin' width={90} height={90} />
            </SidebarHeader>
            <SidebarContent className='p-4'>
                <Link href={"/"} className={"w-full flex items-center justify-center gap-3 px-2.5 py-1.5 rounded-lg bg-maroon-600 hover:bg-maroon-700 dark:bg-ds-bg-primary text-white dark:text-black font-semibold"}>    
                <Flower className='text-current' />
                <span>Preview website</span>
                </Link>
                <MainNavSidebar />
            </SidebarContent>
            <SidebarFooter >
                <UserMenu user={user}  />
            </SidebarFooter>
        </Sidebar>
    )
}
