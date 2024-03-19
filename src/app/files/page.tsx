'use client'

import Loading from "@/components/ui/utils/loading";
import { useUser } from "@/contexts/useCurrentUser";
import { useGetAgendaEduStudentInfo } from "@/hooks/useGetAgendaEduStudentInfo";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import SolicitationCard from "@/components/Responsible/components/solicitations/solicitations-card";
import { flattenAttributes } from "@/lib/utils/flatten-attributes";


export default function FilesHome() {

    const { user } = useUser();

    const { student } = useGetAgendaEduStudentInfo({ responsible: user });

    const [loading, setLoading] = useState(true);

    const [files, setFiles] = useState<StrapiFile[]>(null);

    const getFiles = useCallback(async () => {
        const response = await fetch('/api/strapi/', {
            cache: 'no-store',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'method': 'GET',
                'path': `/api/files/`
            },
            body: JSON.stringify({}),
        });

        if (!response.ok) {
            throw new Error(`Erro ao realizar a requisição: ${response.statusText}`);
        }

        const data = await response.json();

        const flattenedData = flattenAttributes(data.data.data);


        if (data?.data?.data?.length > 0) {
            setFiles(flattenedData);
        }

        setLoading(false);

    }
        , []);

    useEffect(() => {
        getFiles();
    }, [getFiles]);


    if (loading) {
        return (<Loading />)
    }
    return (
        <>
            <div className="p-2 w-full">
                <div className="text-center">

                    <h1> Arquivos </h1>


                    {

                        files !== null &&
                        files.map((file, index) => (
                            <>
                            <a>anything</a>
                                                       {/* <SolicitationCard solicitation={solicitation} key={index} /> */}

                            </>
                        ))
                    }

                </div>
            </div>
        </>
    )

}