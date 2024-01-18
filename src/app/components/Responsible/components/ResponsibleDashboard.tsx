import Image from 'next/image'
import { ResponsibleNavbar } from './navbar/ResponsibleNavbar';
import { StudentInfo } from './student/StudentInfo';
export const ResponsibleDashboard = ({ responsible }: { responsible: any }) => {



    return (
        <main /* style={{ backgroundImage: "url('bg.jpg')" }}*/
            className="h-[100vh] bg-cover">

            {/*NAVBAR}*/}
            <ResponsibleNavbar responsible={responsible} />

            {/*ALUNO*/}
            <StudentInfo responsible={responsible} />

            {/*MAIN CONTENT*
            <div className='h-[calc(100vh-10rem)] overflow-y-auto p-5'>
                <div className='flex flex-col gap-5'>

                    {/*TAREFAS
                    <div className='h-auto border p-2 flex gap-5'>
                        <div className=''>
                            <p className='text-gray-600 text-xs font-bold'>Tarefas</p>
                            <p className='text-gray-800 text-sm font-bold'>Tarefa 1</p>
                        </div>
                        <div className=''>
                            <p className='text-gray-600 text-xs font-bold'>Data</p>
                            <p className='text-gray-800 text-sm font-bold'>10/10/2021</p>
                        </div>
                    </div>

                    {/*AVISOS
                    <div className='h-auto border p-2 flex gap-5'>
                        <div className=''>
                            <p className='text-gray-600 text-xs font-bold'>Avisos</p>
                            <p className='text-gray-800 text-sm font-bold'>Aviso 1</p>
                        </div>
                        <div className=''>
                            <p className='text-gray-600 text-xs font-bold'>Data</p>
                            <p className='text-gray-800 text-sm font-bold'>10/10/2021</p>
                        </div>
                    </div>

                    {/*EVENTOS
                    <div className='h-auto border p-2 flex gap-5'>
                        <div className=''>
                            <p className='text-gray-600 text-xs font-bold'>Eventos</p>
                            <p className='text-gray-800 text-sm font-bold'>Evento 1</p>
                        </div>
                        <div className=''>
                            <p className='text-gray-600 text-xs font-bold'>Data</p>
                            <p className='text-gray-800 text-sm font-bold'>10/10/2021</p>
                        </div>
                    </div>

                </div>
            </div>*/}

        </main>
    )
}

