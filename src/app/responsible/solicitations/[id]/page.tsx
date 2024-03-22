'use client'

import Loading from "@/components/ui/utils/loading";
import { SolicitationShowForm } from "@/components/Responsible/components/solicitations/solicitation-show-form";
import useSWR from "swr";
import { fetcher } from "@/lib/utils/fetcher";

export default function SolicitationShowHome({ params }: { params: { id: string } }) {

    const { data, error, isLoading } = useSWR(`/api/solicitations/?filters[solicitation_id][$eq]=${params.id}&populate[solicitation_commentaries][populate][0]=attachment&populate[solicitation_type][populate][1]=name`, fetcher);

    const solicitation = data ? data[0] : null;

    if (isLoading) {
        return (<Loading />)
    }

    return (
        <>
            {solicitation !== null &&
                <div className="p-2 w-full">
                    <div className="text-center">
                        <h1 className="mb-2 font-bold text-gray-800">Solicitação #{solicitation.solicitation_id}</h1>
                        <SolicitationShowForm solicitation={solicitation}  />
                    </div>
                </div>
            }
        </>
    )

}