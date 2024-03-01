'use client'

import { Loading } from "@/components/ui/utils/Loading";
import { useUser } from "@/contexts/useCurrentUser";
import { useGetAgendaEduStudentInfo } from "@/hooks/useGetAgendaEduStudentInfo";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Image from 'next/image';

export default function AuthorizedCarriersHome() {

    const { user } = useUser();

    const { student } = useGetAgendaEduStudentInfo({ responsible: user });

    const [loading, setLoading] = useState(true);

    const [authorizedCarriers, setAuthorizedCarriers] = useState<AuthorizedCarrierSubscriptionInput[]>(null);

    const getAuthorizedCarriers = useCallback(async () => {
        const response = await fetch('/api/strapi/', {
            cache: 'no-store',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'method': 'GET',
                'path': `/api/authorized-carriers/?filters[student_id][$eq]=${student.id}`
            },
            body: JSON.stringify({}),
        });

        if (!response.ok) {
            throw new Error(`Erro ao realizar a requisição: ${response.statusText}`);
        }

        const data = await response.json();

        console.log(data.data.data);

        if (data.data.data.length > 0) {
            setAuthorizedCarriers(data.data.data);
        }

        setLoading(false);

    }
        , [student.id]);

    useEffect(() => {
        getAuthorizedCarriers();
    }, [getAuthorizedCarriers]);


    if (loading) {
        return (<Loading />)
    }
    return (
        <>
            <div className="p-2 w-full">
                <div className="text-center">

                    <h1 className="mb-5 font-bold text-gray-800">Portadores Autorizados</h1>
                    {/*}
                    {
                        
                        authorizedCarriers === null ?
                            /*
                            <Link href="/nightactivies/subscription">
                                <button type="button" className="p-2 bg-green-500 text-white rounded mb-2">Realizar Inscrição</button>
                            </Link>
                            


                            <>
                                <button disabled type="button" className="p-2 bg-gray-500 text-white rounded mb-2">Inscrições Encerradas</button>
                            </>

                            :
                            <NightacvivitySubscriptionCard subscription={subscription} />


                    }
                    */}
                </div>
            </div>
        </>
    )

}