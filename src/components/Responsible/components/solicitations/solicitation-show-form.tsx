'use client'

import { Solicitation } from "@/types/solicitations";
import SolicitationCommentariesLayout from "./commentary/solicitations-commentary-layout";
import Link from "next/link";

export const SolicitationShowForm = ({ solicitation }: { solicitation: Solicitation }) => {

    const solicitationBoolStatus = solicitation.status === 'Encerrada' ? false : true;

    return (
        <>
            <div className="my-2">
                <p>
                    Tipo de Solicitação:
                </p>
                <p className="font-bold">
                    {solicitation.solicitation_type.name}
                </p>
            </div>

            <div className="mb-5">
                <label htmlFor="description" className="block mb-2 text-sm font-bold text-gray-900">Descrição</label>
                <textarea disabled value={solicitation.description} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>

            <div className="my-2">
                <p className="font-bold text-lg">
                    Comentários:
                </p>
                <SolicitationCommentariesLayout solicitation_commentaries={solicitation.solicitation_commentaries.data} />
            </div>

            {solicitationBoolStatus &&
                <>
                    <Link href={`/responsible/solicitations/${solicitation.id}/commentary/create/`}>
                        <div className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center ">Enviar resposta</div>
                    </Link>
                </>
            }
        </>

    )

}