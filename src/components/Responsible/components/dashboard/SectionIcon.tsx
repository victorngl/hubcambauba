import Image from 'next/image'
import Link from 'next/link'

export const SectionIcon = ({ icon, title, href }) => {
    return (
        <>
            <div className="flex flex-col w-full">
                <Link href={href}>
                <div className="flex flex-col items-center justify-center w-full h-32 bg-white rounded-lg shadow-md">
                    <div className="flex items-center justify-center w-12 h-12 mb-2 rounded-full bg-indigo-100">
                        <Image src={icon} width={24} height={24} alt="attendance" />
                    </div>
                    <p className="text-xs font-semibold text-gray-700 text-center">{title}</p>
                </div>
                </Link>
            </div>
        </>
    )
}