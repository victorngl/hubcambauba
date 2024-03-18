'use client'

import Loading from "@/components/ui/utils/loading";
import { useUser } from "@/contexts/useCurrentUser";
import { useGetAgendaEduStudentInfo } from "@/hooks/useGetAgendaEduStudentInfo";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { OlympicShirt } from "@/types/olympics";
import OlympicShirtCard from "@/components/Responsible/components/olympics/shirt/olympic-shirt-card";
import SolicitationCard from "@/components/Responsible/components/solicitations/solicitations-card";
import { Solicitation } from "@/types/solicitations";
import { flattenAttributes } from "../lib/utils";
export default function OlympicsHome() {

    const { user } = useUser();

    const { student } = useGetAgendaEduStudentInfo({ responsible: user });

    const [loading, setLoading] = useState(true);

    const [solicitations, setSolicitations] = useState<Solicitation[]>(null);

    const getSolicitations = useCallback(async () => {
        const response = await fetch('/api/strapi/', {
            cache: 'no-store',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'method': 'GET',
                'path': `/api/solicitations/?filters[student_id][$eq]=${student.id}&populate=*`
            },
            body: JSON.stringify({}),
        });

        if (!response.ok) {
            throw new Error(`Erro ao realizar a requisição: ${response.statusText}`);
        }

        const data = await response.json();

        const flattenedData = flattenAttributes(data.data.data);

        console.log(flattenedData);

        if (data.data.data.length > 0) {
            setSolicitations(flattenedData);
        }

        setLoading(false);

    }
        , [student.id]);

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

                    <h1> Solicitações </h1>

                    <div className="flex flex-col w-full justify-center space-y-2">
                            <Link href="/solicitations/create/">
                                <button className="p-4 text-white font-bold bg-blue-600 rounded w-full">
                                    Abrir solicitação
                                </button>
                            </Link>
                    </div>

                    {

                        solicitations !== null &&
                        solicitations.map((solicitation, index) => (
                            <SolicitationCard solicitation={solicitation} key={index} />
                        ))
                    }

                </div>
            </div>
        </>
    )

}