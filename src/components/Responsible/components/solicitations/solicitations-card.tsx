import { Solicitation, SolicitationType } from "@/types/solicitations";
import Image from "next/image";
import Link from "next/link";
export default function SolicitationCard({ solicitation }: { solicitation: Solicitation }) {
    return (


        <div className="flex items-center md:justify-center space-x-3 border-zinc-400 border-2 rounded my-2 p-4 w-full">

            <div>
                <div className="flex flex-col items-center justify-center w-full rounded-lg">
                    <div className="flex items-center justify-center w-14 h-14 mb-2 rounded-full bg-blue-900">
                        <Image src="/icons/solicitation.svg" width={32} height={24} alt="attendance" />
                    </div>
                </div>
            </div>

            <div className="text-left md:text-center md:w-1/2 space-y-1">
                <p className="text-gray-800">Solicitação: <strong>#{solicitation.solicitation_id}</strong></p>
                <p className="text-gray-800">Tipo da Solicitação: <strong>{solicitation.solicitation_type.name}</strong></p>
                <p className="text-gray-800 font-semibold">Status: {solicitation.status}</p>
                <p className="text-gray-800 text-xs font-semibold">Data da Solicitação: {solicitation.createdAt}</p>

                {solicitation.status === "Encerrada" ?
                    <button disabled={true} className="w-full bg-gray-500 my-1 p-2 text-white font-bold rounded">Solicitação Encerrada</button>
                    :
                    <Link href={`/solicitations/${solicitation.solicitation_id}`}>
                        <button className="w-full bg-blue-500 my-1 p-2 text-white font-bold rounded">Exibir solicitação</button>
                    </Link>
                }
            </div>


        </div>

    );
}