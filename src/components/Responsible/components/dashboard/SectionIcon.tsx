import Image from 'next/image'

export const SectionIcon = ({ icon, title }) => {
    return (
        <>
            <div className="flex flex-col w-full md:w-1/2">
                <div className="flex flex-col items-center justify-center w-full h-32 bg-white rounded-lg shadow-md">
                    <div className="flex items-center justify-center w-12 h-12 mb-2 rounded-full bg-indigo-100">
                        <Image src={icon} width={24} height={24} alt="attendance" />
                    </div>
                    <p className="text-sm font-semibold text-gray-700">{title}</p>
                </div>
            </div>
        </>
    )
}