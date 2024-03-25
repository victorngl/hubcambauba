'use client'

import Loading from "@/components/ui/utils/loading";
import { SolicitationShowForm } from "@/components/coordinator/components/solicitations/solicitation-show-form";
import useSWR from "swr";
import { fetcher } from "@/lib/utils/fetcher";
import Link from "next/link";

export default function SolicitationShowHome({ params }: { params: { id: string } }) {

    const { data: solicitation, error, isLoading } = useSWR(`/api/solicitations/${params.id}?populate[solicitation_commentaries][populate][0]=attachment&populate[solicitation_type][populate][1]=name`, fetcher);

    if (isLoading) {
        return (<Loading />)
    }
    return (
        <>
            {solicitation !== null &&
                <div className="p-2 w-full">
                    <div className="text-center">
                        <h1 className="mb-2 font-bold text-gray-800">Solicitação #{solicitation.id}</h1>

                        <div className="grid grid-cols-2 w-full gap-2">
                            <Link href={`/coordinator/solicitations/${solicitation.id}/transfer`}>
                                <div className="text-white font-bold rounded p-2 bg-green-400">Transferir</div>
                            </Link>
                            <Link href={`/coordinator/solicitations/${solicitation.id}/transfer`}>
                                <div className="text-white font-bold rounded p-2 bg-blue-500">Mudar status</div>
                            </Link>
                        </div>

                        <SolicitationShowForm solicitation={solicitation} />
                    </div>
                </div>
            }
        </>
    )

}