import { SolicitationCommentary } from "@/types/solicitations";
import Image from "next/image";
import Link from "next/link";
export default function SolicitationCommentaryCard({ commentary }: { commentary: SolicitationCommentary }) {

    console.log(commentary);
    
    return (

        <div className="flex items-center space-x-3 border-zinc-400 border-2 rounded my-2 p-4 w-full">



            <div className="text-left space-y-1 md:space-y-4 w-full">
                <p className="text-gray-800 text-xs">Usuário: <strong>{commentary.user_name}</strong></p>
                <p className="text-gray-800 text-xs">E-mail: <strong>{commentary.user_email}</strong></p>
                <p className="text-gray-800 text-xs">Data da Resposta: <strong>{commentary.createdAt}</strong></p>
                <p className="text-gray-800 font-bold">Resposta:</p>
                <div className="text-gray-800 border-2 w-full p-2 md:p-4">{commentary.description}</div>
                {commentary?.attachment?.data !== undefined &&
                    <>
                        <p className="text-gray-800 text-xs font-semibold">Anexos:</p>
                        <div className="w-full">

                            {commentary.attachment.data.map((attachment, index) => {
                                return (
                                    <>
                                        <div className="flex gap-2 items-center w-max">
                                            <div className="flex items-center justify-center w-8 h-8 mb-2 rounded-full bg-blue-900">
                                                <Image src="/icons/attachment.svg" width={20} height={20} alt="attendance" />
                                            </div>

                                            <Link href={process.env.NEXT_PUBLIC_STRAPI_URL + attachment.url} target="_blank">
                                                <div className="text-blue-600 underline" rel="noreferrer">{attachment.name.substring(0, 30)}{attachment.name.length>30&&'...'}</div>
                                            </Link>

                                        </div>
                                    </>
                                )
                            })}
                        </div>

                    </>
                }

            </div>


        </div>

    );
}