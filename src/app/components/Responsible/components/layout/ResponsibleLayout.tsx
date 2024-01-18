'use client'

import { useUser } from "@/app/contexts/useCurrentUser";
import useAgendaEduToken from "@/app/hooks/useAgendaEduToken";

export default function ResponsibleLayout({ children }) {
    const { currentUser, currentUserRole, isAuthorized, isLoading } = useAgendaEduToken();

    const { user, setCurrentUser } = useUser();

    if (isLoading) {
        return (
            <div className="flex">
                <p> Carregando... </p>
            </div>
        )
    }

    if (!currentUser || !isAuthorized) {
        return (
            <div className="flex">
                <p> Usuário não encontrado ou não autorizado. </p>
            </div>
        )
    }

    if (currentUser && (currentUserRole === "master" || currentUserRole === "responsible") && isAuthorized) {
        setCurrentUser(currentUser);
    }

    if (user) {
        return (
            <>
                {children}
            </>
        )

    }


}