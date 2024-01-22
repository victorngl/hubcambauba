'use client'

import { useUser } from "@/contexts/useCurrentUser";
import { useGetAgendaEduStudentInfo } from "@/hooks/useGetAgendaEduStudentInfo";

export default function NightActivities() {
    const { user } = useUser();
    const { student } = useGetAgendaEduStudentInfo({ responsible: user });

    return (
        <>
            <div className="p-2 w-full">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Atividades Complementares Noturnas</h1>
                    <p className="text-sm text-gray-600">Atividades Complementares Noturnas</p>
                </div>
            </div>
        </>
    )

}