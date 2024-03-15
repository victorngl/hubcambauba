'use client'

import Loading from "@/components/ui/utils/loading";
import { useUser } from "@/contexts/useCurrentUser";
import { useGetAgendaEduStudentInfo } from "@/hooks/useGetAgendaEduStudentInfo";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { OlympicShirt } from "@/types/olympics";
import OlympicShirtCard from "@/components/Responsible/components/olympics/shirt/olympic-shirt-card";
import OlympicHeader from "@/components/Responsible/components/olympics/olympic-header";

export default function OlympicsHome() {

    const { user } = useUser();

    const { student } = useGetAgendaEduStudentInfo({ responsible: user });

    const [loading, setLoading] = useState(true);

    const [olympicShirts, setOlympicShirts] = useState<OlympicShirt[]>(null);
    const [studentShirtButton, setStudentShirtButton] = useState<boolean>(false);


    const getOlympicShirts = useCallback(async () => {
        const response = await fetch('/api/strapi/', {
            cache: 'no-store',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'method': 'GET',
                'path': `/api/olympic-shirts/?filters[student_id][$eq]=${student.id}`
            },
            body: JSON.stringify({}),
        });

        if (!response.ok) {
            throw new Error(`Erro ao realizar a requisição: ${response.statusText}`);
        }

        const data = await response.json();

        console.log(data.data.data);

        if (data.data.data.length > 0) {
            setOlympicShirts(data.data.data);


            data.data.data.map((shirt: OlympicShirt) => {
                if (shirt.attributes.student_shirt) {
                    setStudentShirtButton(true);
                }
            });


        }

        setLoading(false);

    }
        , [student.id]);

    useEffect(() => {
        getOlympicShirts();
    }, [getOlympicShirts]);


    if (loading) {
        return (<Loading />)
    }
    return (
        <>
            <div className="p-2 w-full">
                <div className="text-center">

                    <OlympicHeader />
                    {

                        olympicShirts !== null &&
                        olympicShirts.map((shirt, index) => (
                            <OlympicShirtCard shirt={shirt} key={index} />
                        ))
                    }

                    <div className="flex flex-col w-full justify-center space-y-2">
                        {!studentShirtButton &&
                            <Link href="/olympics/shirt/student">
                                <button className="p-4 text-white font-bold bg-blue-600 rounded w-full">

                                    Escolher o tamanho da camisa do aluno

                                </button>
                            </Link>
                        }

                        {/*
                        
                        <button className="p-4 text-white font-bold bg-green-400 rounded">
                            <Link href="/olympics/shirt/responsible">
                                Adquirir camisa extra
                            </Link>
                        </button>

                        */}
                    </div>


                </div>
            </div>
        </>
    )

}