'use client'

import { CoordinatorNavbar } from "@/components/coordinator/components/navbar/coordinator-navbar";
import CoordinatorInfo from "../coordinator/coordinator-info";

export default function CoordinatorLayout({ children, user }: { children?: React.ReactNode, user: any }) {
    return (
        <>
            <CoordinatorNavbar user={user} />
            <CoordinatorInfo user={user} />
            {children}
        </>
    )


}