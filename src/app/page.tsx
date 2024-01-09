'use client'

import useAgendaEduToken from "./hooks/useAgendaEduToken";

export default function Home() {
  const { currentUser, currentUserRole, isAuthorized, isLoading } = useAgendaEduToken();

  if (currentUser && isAuthorized && !isLoading) {
    return (
      <div className="flex">
        <p>Seu nome é {currentUser.data.attributes.name}</p>
        <br></br>
        <p>Você é um {currentUserRole}</p>
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
