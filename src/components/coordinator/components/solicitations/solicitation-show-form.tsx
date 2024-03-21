'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import FieldErrorBoundary from "../../../ui/utils/field-error-boundary";
import { useState } from "react";
import { Solicitation, SolicitationCommentary } from "@/types/solicitations";
import SolicitationCommentaryCard from "./commentary/solicitations-commentary-card";
import { flattenAttributes } from "@/lib/utils/flatten-attributes";

const solicitationCommentarySchema = z.object({
    solicitation: z.number(),
    description: z.string({ invalid_type_error: 'Campo obrigatório' }).min(1, { message: 'Campo obrigatório' }).max(500, { message: 'Máximo de 500 caracteres' }),
    user_email: z.string(),
    user_name: z.string(),
    attachment: z.any().optional().nullable()
});


export const SolicitationShowForm = ({ responsible, solicitation }: { responsible: any, solicitation?: Solicitation }) => {
    const router = useRouter();

    const [files, setFiles] = useState<FileList>(null);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<SolicitationCommentary>({
        resolver: zodResolver(solicitationCommentarySchema),
        defaultValues: {
            solicitation: solicitation.id,
            description: null,
            user_email: responsible.data.attributes.email,
            user_name: responsible.data.attributes.name,
            attachment: null
        }
    });

    const onSubmit: SubmitHandler<SolicitationCommentary> = async data => {
        setLoading(true);

        const formData = new FormData();

        formData.append('data', JSON.stringify(data));

        if (files?.length >= 1) {
            for (let i = 0; i < files.length; i++) {
                formData.append('files.attachment', files[i]);
            }
        }

        const solicitationCreated = await createSolicitationCommentary(formData);

        setLoading(false);

        if (solicitationCreated.data.data !== null) {
            reset();
            router.push(`/coordinator/solicitations/${solicitation.solicitation_id}`);
        } else {
            alert('Erro ao realizar o envio da resposta!');
        }
    }


    async function createSolicitationCommentary(data: FormData) {

        const response = await fetch('/api/strapi-upload/', {
            cache: 'no-store',
            method: 'POST',
            headers: {
                'method': 'POST',
                'path': `/api/solicitation-commentaries/`
            },
            body: data,
        });

        if (!response.ok) {
            throw new Error(`Erro ao realizar a requisição: ${response.statusText}`);
        }

        const responseJson = await response.json();

        return responseJson;
    }

    const handleInputFilesChange = (event) => {
        setFiles(event.target.files);
    };

    const solicitationBoolStatus = solicitation.status === 'Encerrada' ? false : true;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* include validation with required or other standard HTML validation rules */}


            <div className="my-2">
                <p>
                    Tipo de Solicitação:
                </p>
                <p className="font-bold">
                    {solicitation.solicitation_type.name}
                </p>
            </div>



            <div className="mb-5">
                <label htmlFor="description" className="block mb-2 text-sm font-bold text-gray-900">Descrição</label>
                <textarea disabled value={solicitation.description} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>



            <div className="my-2">
                <p className="font-bold text-lg">
                    Comentários:
                </p>
                <ul>
                    {solicitation?.solicitation_commentaries?.data?.length > 0 && solicitation.solicitation_commentaries.data.map((commentary, index) => {
                        return (
                            <li key={index}>
                                <SolicitationCommentaryCard commentary={commentary} />
                            </li>
                        )
                    })}
                </ul>
            </div>

            {solicitationBoolStatus &&
                <>
                    <div className="mb-5">
                        {errors.description && <FieldErrorBoundary>{errors.description.message}</FieldErrorBoundary>}

                        <label htmlFor="description" className="block mb-2 text-sm font-bold text-gray-900">Resposta</label>
                        <textarea  {...register("description")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    </div>

                    <div className="mb-5">

                        <label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor="multiple_files">Anexar arquivos</label>
                        <input onChange={e => handleInputFilesChange(e)} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" multiple />

                    </div>

                    <button disabled={loading} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center ">Enviar resposta</button>
                </>
            }
        </form>
    )

}