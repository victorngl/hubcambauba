'use client'

import Loading from "@/components/ui/utils/loading";
import { useUser } from "@/contexts/useCurrentUser";
import { useCallback, useEffect, useState } from "react";
import SolicitationCard from "@/components/coordinator/components/solicitations/solicitations-card";
import { Solicitation } from "@/types/solicitations";
import { flattenAttributes } from "@/lib/utils/flatten-attributes";

export default function SolicitationHome() {

    const { user } = useUser();

    const [loading, setLoading] = useState(true);

    const [solicitations, setSolicitations] = useState<Solicitation[]>(null);

    const getSolicitations = useCallback(async () => {
        const response = await fetch('/api/strapi/', {
            cache: 'no-store',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'method': 'GET',
                'path': `/api/solicitations/?filters[solicitation_type][department][responsible_email][$eq]=${user.data.attributes.email}&sort=status&populate=*`
            },
            body: JSON.stringify({}),
        });

        if (!response.ok) {
            throw new Error(`Erro ao realizar a requisição: ${response.statusText}`);
        }

        const data = await response.json();

        if (data?.data?.data?.length > 0) {
            const flattenedData = flattenAttributes(data.data.data);
            setSolicitations(flattenedData);
        }

        setLoading(false);

    }
        , [user.data.attributes.email]);

    useEffect(() => {
        getSolicitations();
    }, [getSolicitations]);


    if (loading) {
        return (<Loading />)
    }
    return (
        <>
            <div className="p-2 w-full">
                <div className="text-center">
                    <h1 className="text-xl font-bold text-gray-800">Solicitações</h1>

                    {
                        solicitations !== null &&
                        solicitations.map((solicitation, index) => (
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