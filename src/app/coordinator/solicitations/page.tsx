'use client'

import Loading from "@/components/ui/utils/loading";
import { useUser } from "@/contexts/useCurrentUser";
import { fetcher } from "@/lib/utils/fetcher";
import SolicitationCard from "@/components/coordinator/components/solicitations/solicitations-card";
import useSWR from "swr";
import { Solicitation } from "@/types/solicitations";


export default function SolicitationHome() {
    const { user } = useUser();

    const { data: solicitations, error, isLoading } = useSWR(`/api/solicitations/?filters[solicitation_attendant][responsible_email][$eq]=${user.data.attributes.email}&sort=status&populate=*`, fetcher);

    if (isLoading) {
        return (<Loading />)
    }

    return (
        <>
            <div className="p-2 w-full">
                <div className="text-center">
                    <h1 className="text-xl font-bold text-gray-800">Solicitações</h1>

                    {
                        solicitations !== null &&
                        solicitations.map((solicitation: Solicitation, index: number) => (
                            <div key={index}>
                                <SolicitationCard solicitation={solicitation} />
                            </div>
                        ))
                    }

                </div>
            </div>
        </>
    )

}