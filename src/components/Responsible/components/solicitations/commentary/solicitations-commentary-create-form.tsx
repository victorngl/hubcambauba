import { SolicitationCommentary } from "@/types/solicitations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import FieldErrorBoundary from "../../nightactivies/subscription-form/field-error-boundary";
import { useState } from "react";
import { z } from 'zod';

const solicitationCommentarySchema = z.object({
    solicitation: z.number(),
    description: z.string({ invalid_type_error: 'Campo obrigatório' }).min(1, { message: 'Campo obrigatório' }).max(500, { message: 'Máximo de 500 caracteres' }),
    user_email: z.string(),
    user_name: z.string(),
    attachment: z.any().optional().nullable()
});

export default function SolicitationsCommentaryCreateForm({ responsible, solicitation_id }: { responsible: any, solicitation_id?: number }) {
    const router = useRouter();
    
    const [files, setFiles] = useState<FileList>(null);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<SolicitationCommentary>({
        resolver: zodResolver(solicitationCommentarySchema),
        defaultValues: {
            solicitation: solicitation_id,
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

            router.back();

            reset();

        } else {
            console.log(solicitationCreated);
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

        const responseData = await response.json();

        return responseData;
    }

    const handleInputFilesChange = (event) => {
        setFiles(event.target.files);
    };

    return (
        <div className="p-2">
            <form onSubmit={handleSubmit(onSubmit)}>
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

            </form>
        </div>
    )
}