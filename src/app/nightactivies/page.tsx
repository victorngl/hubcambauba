'use client'

import { NightactivitiesSubscritionForm } from "@/components/Responsible/components/nightactivies/NightactiviesSubscriptionForm";
import { useUser } from "@/contexts/useCurrentUser";
import { useGetAgendaEduStudentInfo } from "@/hooks/useGetAgendaEduStudentInfo";
import { use, useCallback, useEffect, useState } from "react";

export default function NightActivities() {
    const { user } = useUser();
    const { student } = useGetAgendaEduStudentInfo({ responsible: user });

    console.log(student.id)

    const [loading, setLoading] = useState(true);
    const [subscription, setSubscription] = useState<NightactivitiesSubscriptionInput>(null); 

    const getNightactivitySubscription = useCallback(async () => {
        const response = await fetch('/api/strapi/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'method': 'GET',
                'path': `/api/night-activies/?filters[studentId][$eq]=${student.id}`
            },
            body: '',
        });

        if (!response.ok) {
            throw new Error(`Erro ao realizar a requisição: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.data.data.length > 0) {
            setSubscription(data.data.data);
        }

        setLoading(false);

    }
        , [student.id]);

    useEffect(() => {
        getNightactivitySubscription();
    }, [getNightactivitySubscription]);

    return (
        <>
            <div className="p-2 w-full">
                <div className="text-center">
                    <h1 className="mb-5 font-bold text-gray-800">Atividades Complementares Noturnas</h1>
                    {subscription === null && <NightactivitiesSubscritionForm student={student} />}

                </div>
            </div>
        </>
    )

}