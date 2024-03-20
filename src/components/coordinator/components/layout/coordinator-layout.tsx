'use client'

import { CoordinatorNavbar } from "@/components/coordinator/components/navbar/coordinator-navbar";

export default function CoordinatorLayout({ children, user }: { children?: React.ReactNode, user: any }) {
    return (
        <>
            <CoordinatorNavbar user={user} />
            {children}
        </>
    )


}