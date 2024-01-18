export const StudentInfo = ({ responsible }) => {
    const responsibleStudent = responsible.included.find(o => o.type === 'family_profile');
    const studentClassroomsText = responsible.included
        .filter(o => o.type === 'classroom')
        .map(c => `${c.attributes.name}`)[0]

    return (
        <div className='h-auto border p-2 flex gap-5'>

            <div className=''>
                <p className='text-gray-600 text-xs font-bold'>Aluno</p>
                <p className='text-gray-800 text-sm font-bold'>{responsibleStudent.attributes.name}</p>
            </div>

            <div className=''>
                <p className='text-gray-600 text-xs font-bold'>Turma</p>
                <p className='text-gray-800 text-sm font-bold'>{studentClassroomsText}</p>
            </div>

        </div>
    )
}