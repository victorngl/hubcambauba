'use client'

import useAgendaEduToken from "./hooks/useAgendaEduToken";

export default function Home() {

  const { currentUser, currentUserRole, isAuthorized } = useAgendaEduToken();

  if (currentUser !== undefined && isAuthorized) {
    return (
      <div className="flex">
        <p>{currentUser.data.attributes.name}</p>
        <p>{currentUserRole}</p>
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
