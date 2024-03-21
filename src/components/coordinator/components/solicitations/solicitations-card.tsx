import { DateParser } from "@/lib/utils/date-parser";
import { Solicitation, SolicitationType } from "@/types/solicitations";
import Image from "next/image";
import Link from "next/link";
export default function SolicitationCard({ solicitation }: { solicitation: Solicitation }) {
    
    const solicitationStatus = solicitation.status;
    var statusClassname;

    if(solicitationStatus === 'Aberto') {
        statusClassname = "p-1 rounded bg-green-500 text-white text-xs";
    }
    else if(solicitationStatus === 'Em andamento') {
        statusClassname = "p-1 rounded bg-yellow-500 text-white text-xs";
    }
    else if(solicitationStatus === 'Encerrada') {
        statusClassname = "p-1 rounded bg-red-500 text-white text-xs";
    }

    const createdAtFormattedDate = DateParser(solicitation.createdAt);


    return (
        <div className="flex items-center md:justify-center space-x-3 border-zinc-400 border-2 rounded my-2 p-4 w-full">

            <div>
                <div className="flex flex-col items-center justify-center w-full rounded-lg">
                    <div className="flex items-center justify-center w-14 h-14 mb-2 rounded-full bg-blue-900">
                        <Image src="/icons/solicitation.svg" width={32} height={24} alt="attendance" />
                    </div>
                </div>
            </div>

            <div className="text-left md:w-full space-y-1">
                <p className="text-gray-800 font-semibold">Solicitação: <strong>#{solicitation.solicitation_id}</strong></p>
                <p className="text-gray-800 font-semibold">Data da Solicitação: {createdAtFormattedDate}</p>

                <p className="text-gray-800 font-semibold">Aluno: {solicitation.student_name}</p>
                <p className="text-gray-800 font-semibold">Turma: {solicitation.student_class}</p>
                <p className="text-gray-800 font-semibold">Tipo da Solicitação: {solicitation.solicitation_type.name}</p>

                <p className="text-gray-800 font-semibold flex space-x-1"><div>Status:</div><div className={statusClassname}>{solicitation.status}</div></p>


                <Link href={`/coordinator/solicitations/${solicitation.solicitation_id}`}>
                    <button className="w-full bg-blue-500 my-1 p-2 text-white font-bold rounded">Exibir solicitação</button>
                </Link>

            </div>


        </div>

    );
}