'use client'

import Loading from "@/components/ui/utils/loading";
import { useUser } from "@/contexts/useCurrentUser";
import { useGetAgendaEduStudentInfo } from "@/hooks/useGetAgendaEduStudentInfo";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { flattenAttributes } from "@/lib/utils/flatten-attributes";
import SchoolFilesPageHeader from "@/components/Responsible/components/school-files/school-files-page-header";
import SchoolFileCard from "@/components/Responsible/components/school-files/school-files-card";


export default function SchoolFilesHome() {

    const { user } = useUser();

    const { student } = useGetAgendaEduStudentInfo({ responsible: user });

    const [loading, setLoading] = useState(true);

    const [files, setFiles] = useState<SchoolFile[]>(null);

    const getFiles = useCallback(async () => {
        const response = await fetch('/api/strapi/', {
            cache: 'no-store',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'method': 'GET',
                'path': `/api/school-files/`
            },
            body: JSON.stringify({}),
        });

        if (!response.ok) {
            throw new Error(`Erro ao realizar a requisição: ${response.statusText}`);
        }

        const data = await response.json();

        if (data?.data?.data?.length > 0) {
            const flattenedData = flattenAttributes(data.data.data);
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

                    <SchoolFilesPageHeader />

                    {

                        files !== null &&
                        files.map((file, index) => (
                            <>
                                <div key={index}>
                                    <Link className="flex gap-4 items-center" href={file.url}>
                                        <SchoolFileCard file={file} />
                                    </Link>
                                </div>
                            </>
                        ))
                    }

                </div>
            </div>
        </>
    )

}