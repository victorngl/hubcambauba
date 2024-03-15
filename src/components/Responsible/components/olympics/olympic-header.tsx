import Image from "next/image"
export default function OlympicHeader() {
    return (
        <div className="w-full bg-blue-900 flex justify-center rounded-lg mb-2">
            <Image className="rounded-lg p-4" src="/olympics/logo.png" width={200} height={24} alt="olympic-shirt" />
        </div>
    )
}