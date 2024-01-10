'use client'

import useAgendaEduToken from "./hooks/useAgendaEduToken";
import { ResponsibleDashboard } from "./components/Responsible/components/ResponsibleDashboard";

export default function Home() {
  const { currentUser, currentUserRole, isAuthorized, isLoading } = useAgendaEduToken();

  console.log(currentUserRole)
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

  if (currentUser && currentUserRole === "master" && isAuthorized) {
    return (
      <ResponsibleDashboard responsible={currentUser} />
    )
  }
  
}
