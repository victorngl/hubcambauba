'use client'

import { flattenAttributes } from "@/app/lib/utils";
import { SolicitationCreateForm } from "@/components/Responsible/components/solicitations/solicitation-create-form";
import Loading from "@/components/ui/utils/loading";
import { useUser } from "@/contexts/useCurrentUser";
import { useGetAgendaEduStudentInfo } from "@/hooks/useGetAgendaEduStudentInfo";
import { SolicitationType } from "@/types/solicitations";
import { useCallback, useEffect, useState } from "react";

export default function SolicitationCreatePage() {
    const { user } = useUser();

    const { student } = useGetAgendaEduStudentInfo({ responsible: user });

    const [solicitationTypes, setSolicitationsTypes] = useState<SolicitationType[]>(null);
    
    const [loading, setLoading] = useState(true);

    const getSolicitationsTypes = useCallback(async () => {
        const response = await fetch('/api/strapi/', {
            cache: 'no-store',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'method': 'GET',
                'path': `/api/solicitation-types/`
            },
            body: JSON.stringify({}),
        });

        if (!response.ok) {
            throw new Error(`Erro ao realizar a requisição: ${response.statusText}`);
        }

        const data = await response.json();

        const flattenedData = flattenAttributes(data.data.data);

        if (data.data.data.length > 0) {
            setSolicitationsTypes(flattenedData);
        }

        setLoading(false);

    }, []);

    useEffect(() => {
        getSolicitationsTypes();
    }, [getSolicitationsTypes]);

    if (loading) {
        return (<Loading />)
    }
    
    return (
        <div className="p-2 w-full">
            <div className="text-center">
                <h1 className="mb-5 font-bold text-gray-800">Abrir Solicitação</h1>
                <SolicitationCreateForm responsible={user} solicitation_types={solicitationTypes}/>
            </div>
        </div>
    )
}