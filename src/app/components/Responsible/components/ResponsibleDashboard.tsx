import Image from 'next/image'
export const ResponsibleDashboard = ({ responsible }: { responsible: any }) => {


    const responsibleStudent = responsible.included.find(o => o.type === 'family_profile');

    return (
        <main /* style={{ backgroundImage: "url('bg.jpg')" }}*/
            className="h-[100vh] bg-cover">

            <div className="h-[10vh] flex justify-between p-4 items-center bg-slate-100">
                <div className="">
                    <Image src="/logo.png" width={120} height={120} alt='Cambauba Logo'/>
                </div>
                <div className="text-right">
                    <h1 className="text-sm font-bold text-slate-800">Olá, {responsible.data.attributes.name}</h1>
                    <p className="text-xs text-slate-800">O nome do seu filho é {responsibleStudent.attributes.name}</p>
                </div>

            </div>
        </main>
    )
}

