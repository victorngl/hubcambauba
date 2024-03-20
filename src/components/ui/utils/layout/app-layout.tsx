
'use client'

import NotAllowed from "../notallowed/NotAllowed";
import useAgendaEduToken from "@/hooks/useAgendaEduToken";
import { useUser } from "@/contexts/useCurrentUser";
import Loading from "../loading";
import { CoordinatorNavbar } from "@/components/coordinator/components/navbar/coordinator-navbar";
import ResponsibleLayout from "@/components/Responsible/components/layout/ResponsibleLayout";
import { useRouter } from 'next/navigation'
import CoordinatorLayout from "@/components/coordinator/components/layout/coordinator-layout";

export default function AppLayout({ children }) {
    const router = useRouter()
    const { user, setCurrentUser } = useUser();
    const { currentUser, currentUserRole, isAuthorized, isLoading } = useAgendaEduToken({ setCurrentUser });

    console.log(currentUser)

    if (isLoading) {
        return (<Loading />);
    }

    if (!currentUser || !isAuthorized) {
        return (
            <NotAllowed>
                <p className="font-bold text-slate-700">Usuário não encontrado ou não autorizado.</p>
            </NotAllowed>
        )
    }

    /*
    if (currentUser && (currentUserRole === "master" || currentUserRole === "responsible") && isAuthorized) {
        setCurrentUser(currentUser);
    }
    */

    if (user && currentUserRole === "coordinator" && isAuthorized) {

        return (
            <>
                <main /* style={{ backgroundImage: "url('bg.jpg')" }}*/
                    className="h-[100vh] bg-cover">
    
                    <CoordinatorLayout user={user} >
                        {children}
                    </CoordinatorLayout>

                </main >
            </>
        )
    }

    if (user && currentUserRole === "responsible" && isAuthorized) {
        //redirect to responsible route

        return (
            <>
                <main /* style={{ backgroundImage: "url('bg.jpg')" }}*/
                    className="h-[100vh] bg-cover">
                    <ResponsibleLayout user={user}>
                        {children}
                    </ResponsibleLayout>
                </main >
            </>
        )

    }

    return (
        <NotAllowed>
            <p className="font-bold text-slate-700">Usuário não encontrado ou não autorizado.</p>
        </NotAllowed>
    )
}