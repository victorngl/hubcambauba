import Image from "next/image"

export const ResponsibleNavbar = ({ responsible }) => {
    return (
        <>
            <div className="h-auto flex justify-between p-4 items-center bg-slate-100">

                <div className="">
                    <Image src="/logo.png" width={120} height={120} alt='Cambauba Logo' />
                </div>

                <div className="text-right">
                    <h1 className="text-sm font-bold text-slate-800">Olá, {responsible.data.attributes.name}</h1>
                </div>

            </div>
        </>
    )
}