'use client'

import { ResponsibleNavbar } from "../navbar/ResponsibleNavbar";
import StudentInfo from "../student/student-info";

export default function ResponsibleLayout({ children, user }: { children?: React.ReactNode, user: any }) {
    return (
        <>
            <ResponsibleNavbar responsible={user} />
            <StudentInfo responsible={user} />
            {children}
        </>
    )


}