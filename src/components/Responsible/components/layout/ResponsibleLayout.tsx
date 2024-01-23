'use client'

import { useUser } from "@/contexts/useCurrentUser";
import { ResponsibleNavbar } from "../navbar/ResponsibleNavbar";
import StudentInfo from "../student/StudentInfo";
import useAgendaEduToken from "@/hooks/useAgendaEduToken";
import { Loading } from "@/components/utils/Loading";

export default function ResponsibleLayout({ children }) {

    const { user, setCurrentUser } = useUser();
    const { currentUser, currentUserRole, isAuthorized, isLoading } = useAgendaEduToken({ setCurrentUser });

    if (isLoading) {
        return (<Loading />);
    }

    if (!currentUser || !isAuthorized) {
        return (
            <div className="flex">
                <p> Usuário não encontrado ou não autorizado. </p>
            </div>
        )
    }

    /*
    if (currentUser && (currentUserRole === "master" || currentUserRole === "responsible") && isAuthorized) {
        setCurrentUser(currentUser);
    }
    */
    if (user && (currentUserRole === "master" || currentUserRole === "responsible") && isAuthorized) {
        return (
            <>
               
                    <main /* style={{ backgroundImage: "url('bg.jpg')" }}*/
                        className="h-[100vh] bg-cover">
                        {/*NAVBAR}*/}
                        <ResponsibleNavbar responsible={user} />
                        <StudentInfo responsible={user} />

                        {/*ALUNO*/}
                        {children}
                    </main >
               
            </>
        )

    }


}