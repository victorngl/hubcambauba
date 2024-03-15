import { OlympicShirt } from "@/types/olympics";
import Image from "next/image";
export default function OlympicShirtCard({ shirt, key }: { shirt: OlympicShirt, key: number }) {
    return (


        <div key={key} className="flex items-center md:justify-center space-x-3 border-zinc-400 border-2 rounded my-2 p-4 w-full">

            <div>
                <div className="flex flex-col items-center justify-center w-full rounded-lg">
                    <div className="flex items-center justify-center w-14 h-14 mb-2 rounded-full bg-blue-900">
                        <Image src="/icons/shirt.svg" width={32} height={24} alt="attendance" />
                    </div>
                </div>
            </div>

            <div className="text-left md:text-center md:w-1/2 space-y-1">
                <p className="text-gray-800">Tamanho da Camisa: <strong>{shirt.attributes.shirt_size}</strong></p>
                <p className="text-gray-800 text-xs font-semibold">Usuário que respondeu: {shirt.attributes.user_answer}</p>

                {shirt.attributes.student_shirt ? <p className="text-sm bg-blue-900 text-white font-bold p-1 rounded-lg text-center">Camisa do Aluno</p> : <a className="text-sm bg-blue-700 text-white font-bold p-1 rounded-lg">Camisa Extra</a>}
            </div>


        </div>

    );
}