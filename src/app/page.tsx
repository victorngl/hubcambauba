'use client'

import useAgendaEduToken from "./hooks/useAgendaEduToken";

export default function Home() {
  const { currentUser, currentUserRole, isAuthorized, isLoading } = useAgendaEduToken();

  if (currentUser && isAuthorized && !isLoading) {
    return (
      <div className="flex">
        <p>{currentUser.data.attributes.name}</p>
        <p>{currentUserRole}</p>
      </div>
    )
  }
  else if(isLoading) {
    return (
      <div className="flex">
       <p> Carregando... </p>
      </div>
    )
  }
  else {
    return (
      <div className="flex">
       <p> Usuário não encontrado. </p>
      </div>
    )
  }
}
