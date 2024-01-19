'use client'

import { useRouter } from 'next/navigation'

export default function StudentInfo({ responsible }) {
    const router = useRouter();

    const responsibleStudent = responsible.included.find(o => o.type === 'family_profile');

    const studentClassroomsText = responsible.included
        .filter(o => o.type === 'classroom')
        .map(c => `${c.attributes.name}`)[0]


    const handleClick = (e) => {
        e.preventDefault()
        router.back()
    }

    return (
        <div className='h-auto border p-2 flex gap-5 flex-col-3'>

            <div className='w-full'>
                <p className='text-gray-600 text-xs font-bold whitespace-nowrap'>Aluno</p>
                <p className='text-gray-800 text-sm font-bold whitespace-nowrap'>{responsibleStudent.attributes.name}</p>
            </div>

            <div className='w-full'>
                <p className='text-gray-600 text-xs font-bold whitespace-nowrap'>Turma</p>
                <p className='text-gray-800 text-sm font-bold whitespace-nowrap'>{studentClassroomsText}</p>
            </div>

            <div className='w-full text-right'>
                <button onClick={(e) => { handleClick(e) }}
                    type="button"
                    className="p-2 bg-blue-500 rounded-lg text-white text-sm font-bold">
                    Voltar
                </button>
            </div>

        </div>
    )
}