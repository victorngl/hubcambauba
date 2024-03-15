'use client'

import { useGetAgendaEduStudentInfo } from "@/hooks/useGetAgendaEduStudentInfo";
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import FieldErrorBoundary from "../../../../ui/utils/field-error-boundary";
import { useEffect, useState } from "react";
import { OlympicShirt } from "@/types/olympics";
import Image from "next/image";

const shirtSchema = z.object({
    attributes: z.string().nullable().optional(),
    student_id: z.string().optional(),
    student_name: z.string(),
    course_name: z.string(),
    class_name: z.string(),
    shirt_size: z.custom((value) => value !== '', { message: 'Selecione um tamanho' }),
    user_answer: z.string(),
    answered: z.boolean(),
    answer_time: z.date(),
    student_shirt: z.boolean().nullable(),
});

const shirtSizes = [
    { id: 1, name: "4" },
    { id: 2, name: "6" },
    { id: 3, name: "8" },
    { id: 4, name: "10" },
    { id: 5, name: "12" },
    { id: 6, name: "14" },
    { id: 7, name: "PP" },
    { id: 8, name: "P" },
    { id: 9, name: "M" },
    { id: 10, name: "G" },
    { id: 11, name: "GG" },
    { id: 12, name: "52" },
];


export const OlympicShirtForm = ({ responsible, shirt, studentAccess }: { responsible: any, shirt?: OlympicShirt, studentAccess?: boolean }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const { student } = useGetAgendaEduStudentInfo({ responsible });

    const { register, watch, setValue, handleSubmit, formState: { errors } } = useForm<OlympicShirt>({
        resolver: zodResolver(shirtSchema),
        defaultValues: {
            student_id: student.id,
            student_name: student.name,
            course_name: student.course,
            class_name: student.class,
            shirt_size: shirt ? shirt.attributes.shirt_size : '',
            user_answer: responsible.data.attributes.email,
            answer_time: new Date(),
            student_shirt: studentAccess,
            answered: shirt ? shirt.attributes.answered : true,
        }
    });

    const onSubmit: SubmitHandler<OlympicShirt> = async data => {
        setLoading(true);

        const response = await fetch('/api/strapi/', {
            cache: 'no-store',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'method': 'POST',
                'path': `/api/olympic-shirts/`
            },
            body: JSON.stringify({ data }),
        });

        if (!response.ok) {
            throw new Error(`Erro ao realizar a requisição: ${response.statusText}`);
        }

        const responseJson = await response.json();

        setLoading(false);

        if (responseJson.data) {
            router.back();
        } else {
            alert('Erro ao realizar o pedido!');
        }
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
                <input disabled type="courseName" {...register("course_name")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>

            <div className="mb-5">
                <label htmlFor="classsName" className="block mb-2 text-sm font-bold text-gray-900">Turma</label>
                <input disabled type="className" {...register("class_name")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>

        
            <div className="w-full mb-5 text-center flex justify-center">
                <Image className="rounded-lg" src="/olympics/shirtsize.png" width={450} height={24} alt="olympic-shirt" />
            </div>

            <div className="mb-5">

                {errors.shirt_size && <FieldErrorBoundary>{errors.shirt_size.message}</FieldErrorBoundary>}
                <label htmlFor="cultural" className="block mb-2 text-sm font-bold text-gray-900 ">Escolha o tamanho:</label>
                <select {...register("shirt_size")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    {shirtSizes.map((size, index) =>
                        <option key={index} value={size.name}>{size.name}</option>
                    )}

                </select>
            </div>

            <div className='text-sm font-bold text-center mb-3 mt-10'>Verifique o tamanho antes de Enviar</div>

            <button disabled={loading} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Enviar</button>
        </form>
    )

}