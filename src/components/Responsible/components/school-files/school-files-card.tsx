import Image from "next/image";
import Link from "next/link";
export default function SchoolFileCard({ file }: { file: SchoolFile }) {
    return (
        
        <div className="flex items-center justify-center space-x-3 border-zinc-700 border-2 rounded-lg my-2 p-4 w-full bg-blue-900">

           

                <Image src={file.icon} width={100} height={100} alt={file.name} />

                <div>
                    <p className="text-white font-bold my-2 text-lg">{file.name}</p>
                    <p className="text-white font-bold my-2 whitespace-nowrap text-xs">Clique para visualizar o documento</p>
                </div>
            
            {/*}
            <div className="text-left md:text-center md:w-1/2 space-y-1">
                <p className="text-gray-800">Solicitação: <strong>#{file.id}</strong></p>
                <p className="text-gray-800">Tipo da Solicitação: <strong>{file.name}</strong></p>
                <p className="text-gray-800 text-xs font-semibold">Solicitante: {file.name}</p>
                <p className="text-gray-800 text-xs font-semibold">Data da Solicitação: {file.createdAt}</p>
            </div>
    */}

        </div>



    );
}