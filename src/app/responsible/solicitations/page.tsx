'use client'

import Loading from "@/components/ui/utils/loading";
import { useUser } from "@/contexts/useCurrentUser";
import { useGetAgendaEduStudentInfo } from "@/hooks/useGetAgendaEduStudentInfo";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import SolicitationCard from "@/components/Responsible/components/solicitations/solicitations-card";
import { Solicitation } from "@/types/solicitations";
import { flattenAttributes } from "@/lib/utils/flatten-attributes";
import useSWR from "swr";
import { fetcher } from "@/lib/utils/fetcher";

export default function SolicitationHome() {

    const { user } = useUser();

    const { student } = useGetAgendaEduStudentInfo({ responsible: user });

    const { data: solicitations, error, isLoading } = useSWR(`/api/solicitations/?filters[student_id][$eq]=${student.id}&sort=status&populate=*`, fetcher);

    if (isLoading) {
        return (<Loading />)
    }
    return (
        <>
            <div className="p-2 w-full">
                <div className="text-center">

                    <div className="flex flex-col w-full justify-center space-y-2">
                        <Link href="/responsible/solicitations/create/">
                            <button className="p-4 text-white font-bold bg-blue-600 rounded w-full">
                                Abrir solicitação
                            </button>
                        </Link>
                    </div>

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