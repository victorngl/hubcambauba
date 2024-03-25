'use client'

import SolicitationTransferAttendantForm from "@/components/coordinator/components/solicitations/actions/solicitation-transfer-form";
import Loading from "@/components/ui/utils/loading";
import { fetcher } from "@/lib/utils/fetcher";
import { Solicitation } from "@/types/solicitations";
import useSWR from "swr";

export default function SolicitationTransferAttendantPage({ params }: { params: { id: string } }) {

    const { id } = params;

    const { data: solicitation, error, isLoading } = useSWR<Solicitation>(`/api/solicitations/${params.id}?populate[solicitation_commentaries][populate][0]=attachment&populate[solicitation_type][populate]=*`, fetcher);
    
    const attendants = solicitation?.solicitation_type?.solicitation_attendants?.data;

    if(isLoading) {
        return <Loading />
    }
    
    return (
        <div className="p-2">
           <h1>Transferir Solicitação #{id}</h1>
           <SolicitationTransferAttendantForm solicitation_id={solicitation.id} attendants={attendants} />
        </div>
    )
}