'use client'

import { useUser } from "@/contexts/useCurrentUser";
import { ResponsibleNavbar } from "../navbar/ResponsibleNavbar";
import StudentInfo from "../student/StudentInfo";
import useAgendaEduToken from "@/hooks/useAgendaEduToken";
import Loading from "@/components/ui/utils/loading";
import NotAllowed from "@/components/ui/utils/notallowed/NotAllowed";
import { CoordinatorNavbar } from "@/components/coordinator/components/navbar/coordinator-navbar";
import { ResponsibleDashboard } from "../dashboard/ResponsibleDashboard";

export default function ResponsibleLayout({ children, user }: { children?: React.ReactNode, user: any }) {
    return (
        <>
            <ResponsibleNavbar responsible={user} />
            <StudentInfo responsible={user} />
            {children}
        </>
    )


}