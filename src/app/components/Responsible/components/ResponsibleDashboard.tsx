import Image from 'next/image'
export const ResponsibleDashboard = ({ responsible }: { responsible: any }) => {

    const responsibleStudent = responsible.included.find(o => o.type === 'family_profile');
    const studentClassroomsText = responsible.included
        .filter(o => o.type === 'classroom')
        .map(c => `${c.attributes.name}`)[0]

    return (
        <main /* style={{ backgroundImage: "url('bg.jpg')" }}*/
            className="h-[100vh] bg-cover">


            {/*NAVBAR}*/}
            <div className="h-auto flex justify-between p-4 items-center bg-slate-100">

                <div className="">
                    <Image src="/logo.png" width={120} height={120} alt='Cambauba Logo' />
                </div>

                <div className="text-right">
                    <h1 className="text-sm font-bold text-slate-800">Olá, {responsible.data.attributes.name}</h1>
                </div>

            </div>

            {/*ALUNO*/}
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

            {/*MAIN CONTENT*/}



        </main>
    )
}

