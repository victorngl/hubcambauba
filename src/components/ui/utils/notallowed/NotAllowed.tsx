import Image from "next/image"

export default function NotAllowed({ children }) {
    return (
        <div className="justify-center items-center flex h-screen w-full bg-gray-200">
            <div className="space-y-4">
                <div className="flex justify-center">
                    <Image alt="Logo" src="/logo_vert.png" width={200} height={500} />
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}