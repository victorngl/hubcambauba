'use client'

import { NightacvivitySubscriptionCard } from "@/components/Responsible/components/nightactivies/NightactivitySubscriptionCard";
import { Loading } from "@/components/ui/utils/Loading";
import { useUser } from "@/contexts/useCurrentUser";
import { useGetAgendaEduStudentInfo } from "@/hooks/useGetAgendaEduStudentInfo";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Image from 'next/image';

export default function NightActivities() {
    const { user } = useUser();
    const { student } = useGetAgendaEduStudentInfo({ responsible: user });

    const [loading, setLoading] = useState(true);
    const [subscription, setSubscription] = useState<NightactivitiesSubscriptionInput>(null);

    const getNightactivitySubscription = useCallback(async () => {
        const response = await fetch('/api/strapi/', {
            cache: 'no-store',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'method': 'GET',
                'path': `/api/night-activies/?filters[studentId][$eq]=${student.id}`
            },
            body: JSON.stringify({}),
        });

        if (!response.ok) {
            throw new Error(`Erro ao realizar a requisição: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.data.data.length > 0) {
            setSubscription(data.data.data[0].attributes);
        }

        setLoading(false);

    }
        , [student.id]);

    useEffect(() => {
        getNightactivitySubscription();
    }, [getNightactivitySubscription]);


    if (loading) {
        return (<Loading />)
    }
    return (
        <>
            <div className="p-2 w-full">
                <div className="text-center">



                    <h1 className="mb-5 font-bold text-gray-800">Atividades Complementares Noturnas</h1>
                    {
                        subscription === null ?
                            
                            <Link href="/nightactivies/subscription">
                                <button type="button" className="p-2 bg-green-500 text-white rounded mb-2">Realizar Inscrição</button>
                            </Link>
                            

                            /*
                            <>
                                <button disabled type="button" className="p-2 bg-gray-500 text-white rounded mb-2">Inscrições Encerradas</button>
                            </>
                            */
                            :
                            <NightacvivitySubscriptionCard subscription={subscription} />
                    }

                    <div className="flex justify-center space-y-2">

                        <div className="my-5">
                            <p className="text-sm font-semibold">Para visualizar as atividades, basta dar zoom na tela.</p>
                            <Image alt="Atividades Esportivas" src="/nightactivities/esportivas.png" width={1000} height={1000} />
                            <Image alt="Atividades Culturais" src="/nightactivities/cultural.png" width={1000} height={1000} />
                        </div>
                    </div>

                </div>
            </div>
        </>
    )

}