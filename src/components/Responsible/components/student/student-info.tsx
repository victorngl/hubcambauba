'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useGetAgendaEduStudentInfo } from '@/hooks/useGetAgendaEduStudentInfo';
export default function StudentInfo({ responsible }) {

    const router = useRouter();
    const pathname = usePathname();

    const { student } = useGetAgendaEduStudentInfo({ responsible });

    const handleClick = (e) => {
        e.preventDefault();
        router.back();
    }

    return (
        <div className='h-auto border p-2 space-y-4'>

            <div className=''>
                <p className='text-gray-600 text-xs font-bold'>Aluno</p>
                <p className='text-gray-800 text-sm font-bold'>{student.name}</p>
            </div>

            <div className="flex justify-between">
                <div>
                    <p className='text-gray-600 text-xs font-bold'>Turma</p>
                    <p className='text-gray-800 text-sm font-bold'>{student.class} - {student.course}</p>
                </div>
                
                {pathname !== '/' && 
                <div className=''>
                    <button onClick={(e) => { handleClick(e) }}
                        type="button"
                        className="p-2 bg-blue-500 rounded-lg text-white text-sm font-bold">
                        Voltar
                    </button>
                </div>}
            </div>

        </div>
    )
}