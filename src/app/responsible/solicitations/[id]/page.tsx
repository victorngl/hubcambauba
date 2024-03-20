'use client'

import Loading from "@/components/ui/utils/loading";
import { useUser } from "@/contexts/useCurrentUser";
import { useGetAgendaEduStudentInfo } from "@/hooks/useGetAgendaEduStudentInfo";
import { useCallback, useEffect, useState } from "react";
import { Solicitation } from "@/types/solicitations";
import { flattenAttributes } from "@/lib/utils/flatten-attributes";
import { SolicitationShowForm } from "@/components/Responsible/components/solicitations/solicitation-show-form";

export default function SolicitationShowHome({ params }: { params: { id: string } }) {

    const { user } = useUser();

    const { student } = useGetAgendaEduStudentInfo({ responsible: user });

    const [loading, setLoading] = useState(true);

    const [solicitation, setSolicitation] = useState<Solicitation>(null);


    const getSolicitation = useCallback(async () => {

        const response = await fetch('/api/strapi/', {
            cache: 'no-store',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'method': 'GET',
                'path': `/api/solicitations/?filters[solicitation_id][$eq]=${params.id}&populate[solicitation_commentaries][populate][0]=attachment&populate[solicitation_type][populate][1]=name`
            },
            body: JSON.stringify({}),
        });

        if (!response.ok) {
            throw new Error(`Erro ao realizar a requisição: ${response.statusText}`);
        }

        const data = await response.json();

        if (data?.data?.data?.length > 0) {
            const flattenedData = flattenAttributes(data.data.data);
            setSolicitation(flattenedData[0]);
        }

        setLoading(false);

    }
        , [params.id]);

    useEffect(() => {
        getSolicitation();
    }, [getSolicitation]);


    if (loading) {
        return (<Loading />)
    }
    return (
        <>
            {solicitation !== null &&
                <div className="p-2 w-full">
                    <div className="text-center">
                        <h1 className="mb-2 font-bold text-gray-800">Solicitação #{solicitation.solicitation_id}</h1>
                        <SolicitationShowForm responsible={user} solicitation={solicitation} />
                    </div>
                </div>
            }
        </>
    )

}