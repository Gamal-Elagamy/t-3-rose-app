import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className="grid grid-cols-3 gap-4 h-screen">
                <section className="col-span-2 bg-red-500">
                    {children}
                </section>
                <section className="col-span-1 bg-blue-600 ">
                    
                </section>
            </div>
            <div className="h-56 bg-yellow-200">Products</div>
        </div>
    )
}
