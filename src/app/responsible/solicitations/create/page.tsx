'use client'

import { SolicitationCreateForm } from "@/components/Responsible/components/solicitations/solicitation-create-form";
import Loading from "@/components/ui/utils/loading";
import { useUser } from "@/contexts/useCurrentUser";
import { useGetAgendaEduStudentInfo } from "@/hooks/useGetAgendaEduStudentInfo";
import { SolicitationType } from "@/types/solicitations";
import { useCallback, useEffect, useState } from "react";
import { flattenAttributes } from "@/lib/utils/flatten-attributes";
import { fetcher } from "@/lib/utils/fetcher";
import useSWR from "swr";

export default function SolicitationCreatePage() {
    const { user } = useUser();

    const { data: types, error, isLoading } = useSWR(`/api/solicitation-types?populate=*`, fetcher);

    if (isLoading) {
        return (<Loading />)
    }
    
    return (
        <div className="p-2 w-full">
            <div className="text-center">
                <h1 className="mb-5 font-bold text-gray-800">Abrir Solicitação</h1>
                <SolicitationCreateForm responsible={user} solicitation_types={types}/>
            </div>
        </div>
    )
}