import { Solicitation } from "@/types/solicitations";
import Image from "next/image";
export default function SolicitationCard({ solicitation, key }: { solicitation: Solicitation, key: number }) {
    return (


        <div key={key} className="flex items-center md:justify-center space-x-3 border-zinc-400 border-2 rounded my-2 p-4 w-full">

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
                <p className="text-gray-800 text-xs font-semibold">Solicitante: {solicitation.requester_name}</p>
                <p className="text-gray-800 text-xs font-semibold">Data da Solicitação: {solicitation.createdAt}</p>
            </div>


        </div>

    );
}