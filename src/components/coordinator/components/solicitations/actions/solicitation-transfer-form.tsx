import { SolicitationAttendant } from "@/types/solicitations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { z } from 'zod';
import FieldErrorBoundary from "@/components/ui/utils/field-error-boundary";

const solicitationTransferSchema = z.object({
    solicitation_attendant: z.string().transform(value => parseInt(value))
});

export default function SolicitationTransferAttendantForm({ solicitation_id, attendants }: { solicitation_id: string, attendants: SolicitationAttendant[] }) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(solicitationTransferSchema),
    });

    const onSubmit = async data => {
        setLoading(true);

        const transferRes = await transferSolicitationAttendant(data);

        setLoading(false);

        if (transferRes.data.data !== null) {
            alert('Solicitação Transferida!');
            router.push('/coordinator/solicitations');
           
        } else {
            console.log(transferRes);
            alert('Erro ao realizar o envio da resposta!');
        }
    }

    async function transferSolicitationAttendant(data) {

        const response = await fetch('/api/strapi/', {
            cache: 'no-store',
            method: 'POST',
            headers: {
                'method': 'PUT',
                'path': `/api/solicitations/${solicitation_id}`
            },
            body: JSON.stringify({ data }),
        });

        if (!response.ok) {
            throw new Error(`Erro ao realizar a requisição: ${response.statusText}`);
        }

        const responseData = await response.json();

        return responseData;
    }


    return (
        <div className="p-2">
            <form onSubmit={handleSubmit(onSubmit)}>


                <div className="mb-5">
                    {errors.attendant && <FieldErrorBoundary>{errors.attendant.message}</FieldErrorBoundary>}
                    <label htmlFor="solicitation_attendant" className="block mb-2 text-sm font-medium text-gray-900 ">Escolha o profissional:</label>
                    <select {...register("solicitation_attendant")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        {attendants.map((attendant: SolicitationAttendant, index) =>
                            <option key={index} value={attendant.id}>{attendant.responsible_name}</option>
                        )}
                    </select>
                </div>


                <button disabled={loading} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center ">Transferir Solicitação</button>

            </form>
        </div>
    )
}