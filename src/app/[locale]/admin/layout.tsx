import { authOptions } from '@/auth'
import AdminAppSidebar from '@/features/admin/components/sidebar/admin-app-sidebar'
import { SiteHeader } from '@/features/admin/components/sidebar/site-header'
import { SidebarProvider } from '@/shared/components/ui/sidebar'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function layout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions)

    if(session?.user.role !== "ADMIN") {
        redirect("/")
    }
    return (
        <SidebarProvider>
            <AdminAppSidebar user={session.user} />
            <main className='size-full bg-zinc-50 dark:bg-zinc-900 flex flex-col flex-1 min-h-screen '>
                <SiteHeader user={session.user} />
                {children}
            </main>
        </SidebarProvider>
    )
}
