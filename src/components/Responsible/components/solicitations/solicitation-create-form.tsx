'use client'

import { useGetAgendaEduStudentInfo } from "@/hooks/useGetAgendaEduStudentInfo";
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import FieldErrorBoundary from "../../../ui/utils/field-error-boundary";
import { useState } from "react";
import { Solicitation, SolicitationAttendant, SolicitationType } from "@/types/solicitations";
import { generateRandomNumber } from "@/lib/utils/generate-random-number";

const solicitationSchema = z.object({
    solicitation_id: z.string().optional(),
    requester_email: z.string(),
    requester_name: z.string(),
    subject: z.string({ invalid_type_error: "O assunto é obrigatório." }).min(1, { message: 'Campo obrigatório' }).max(100, { message: 'Máximo de 100 caracteres' }),
    status: z.string(),
    priority: z.string(),
    solicitation_type: z.string({ invalid_type_error: "Selecione um tipo de solicitação." }).min(1, 'Selecione um tipo de solicitação').transform(value => Number(value)),
    student_id: z.string(),
    student_name: z.string(),
    student_course: z.string(),
    student_class: z.string(),
    description: z.string({ invalid_type_error: "A descrição é obrigatório." }).min(1, { message: 'Campo obrigatório' }).max(500, { message: 'Máximo de 500 caracteres' }),
    solicitation_attendant: z.string().optional().nullable(),
});

const findAttendant = (solicitation_type: SolicitationType, student) => {

    const attendant = solicitation_type.solicitation_attendants.data.find(attendant => attendant.course === student.course);
    return attendant;
}

export const SolicitationCreateForm = ({ responsible, solicitation, solicitation_types }: { responsible: any, solicitation?: Solicitation, solicitation_types?: SolicitationType[] }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { student } = useGetAgendaEduStudentInfo({ responsible });

    const { register, handleSubmit, formState: { errors } } = useForm<Solicitation>({
        resolver: zodResolver(solicitationSchema),
        defaultValues: {
            solicitation_id: solicitation ? solicitation?.solicitation_id : Number(student.id + generateRandomNumber()).toString(),
            requester_email: solicitation ? solicitation?.requester_email : responsible.data.attributes.email,
            requester_name: solicitation ? solicitation?.requester_name : responsible.data.attributes.name,
            subject: solicitation ? solicitation?.subject : null,
            status: solicitation ? solicitation?.status : 'Aberto',
            priority: solicitation ? solicitation?.priority : 'Normal',
            solicitation_type: solicitation ? solicitation?.solicitation_type : null,
            student_id: student.id,
            student_name: student.name,
            student_course: student.course,
            student_class: student.class,
            description: solicitation ? solicitation?.description : null,
            solicitation_attendant: solicitation ? solicitation?.solicitation_attendant.id : null,
        }
    });

    const onSubmit: SubmitHandler<Solicitation> = async data => {
        setLoading(true);

        const solicitation_type = solicitation_types.find(type => type.id === data.solicitation_type);
        const attendant = findAttendant(solicitation_type, student);

        data.solicitation_attendant = attendant.id;
        
        const solicitationCreated = await createSolicitation(data);

        setLoading(false);

        if (solicitationCreated.data) {
            router.back();
        } else {
            alert('Erro ao realizar o pedido!');
        }
    }

    async function createSolicitation(data: Solicitation) {

        const response = await fetch('/api/strapi/', {
            cache: 'no-store',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'method': 'POST',
                'path': `/api/solicitations?populate=*`
            },
            body: JSON.stringify({ data }),
        });

        if (!response.ok) {
            throw new Error(`Erro ao realizar a requisição: ${response.statusText}`);
        }

        const responseJson = await response.json();

        return responseJson;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* include validation with required or other standard HTML validation rules */}

            <div className="mb-5">
                <label htmlFor="studantName" className="block mb-2 text-sm font-bold text-gray-900">Nome do Aluno(a)</label>
                <input disabled type="studantName" {...register("student_name")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>

            <div className="mb-5">
                <label htmlFor="courseName" className="block mb-2 text-sm font-bold text-gray-900">Série</label>
                <input disabled type="courseName" {...register("student_course")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>

            <div className="mb-5">
                <label htmlFor="classsName" className="block mb-2 text-sm font-bold text-gray-900">Turma</label>
                <input disabled type="className" {...register("student_class")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>

            <div className="mb-5">
                <label htmlFor="classsName" className="block mb-2 text-sm font-bold text-gray-900">Turma</label>
                <input disabled type="className" {...register("student_class")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>


            <div className="mb-5">

                {errors.solicitation_type && <FieldErrorBoundary>{errors.solicitation_type.message}</FieldErrorBoundary>}
                <label htmlFor="solicitation_type" className="block mb-2 text-sm font-bold text-gray-900 ">Escolha o tipo de solicitação:</label>
                <select disabled={solicitation == undefined ? false : true} {...register("solicitation_type")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    {solicitation_types.map((type, index) =>
                        <option key={index} value={type.id}>{type.name}</option>
                    )}

                </select>
            </div>

            <div className="mb-5">
                {errors.subject && <FieldErrorBoundary>{errors.subject.message}</FieldErrorBoundary>}

                <label htmlFor="subject" className="block mb-2 text-sm font-bold text-gray-900">Assunto</label>
                <input disabled={solicitation == undefined ? false : true} type="subject" {...register("subject")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>

            <div className="mb-5">
                {errors.description && <FieldErrorBoundary>{errors.description.message}</FieldErrorBoundary>}

                <label htmlFor="description" className="block mb-2 text-sm font-bold text-gray-900">Descrição</label>
                <textarea disabled={solicitation == undefined ? false : true} {...register("description")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>


            <button disabled={loading} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center ">Enviar</button>
        </form>
    )

}