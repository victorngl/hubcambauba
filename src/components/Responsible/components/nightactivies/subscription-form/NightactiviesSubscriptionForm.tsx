'use client'

import { useGetAgendaEduStudentInfo } from "@/hooks/useGetAgendaEduStudentInfo";
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import FieldErrorBoundary from "./field-error-boundary";
import { useState } from "react";

const OficinasEsportivas = [
    { id: 1, name: 'FUTSAL (misto) - 1º e 2º Ano / EF', permission: [{ course: '1º Ano' }, { course: '2º Ano' }] },
    { id: 2, name: 'FUTSAL (masc) - 5º e 6º Ano / EF', permission: [{ course: '5º Ano' }, { course: '6º Ano' }] },
    { id: 3, name: 'FUTSAL (masc) - 7º e 8º Ano / EF', permission: [{ course: '7º Ano' }, { course: '8º Ano' }] },
    { id: 4, name: 'FUTSAL (masc) - 9º Ano a 3ª Série / EF', permission: [{ course: '9º Ano' }, { course: '1ª Série' }, { course: '2ª Série' }, { course: '3ª Série' }] },
    { id: 5, name: 'FUTSAL (fem) - 6º ao 9º Ano / EF', permission: [{ course: '6º Ano' }, { course: '7º Ano' }, { course: '8º Ano' }, { course: '9º Ano' }] },
    { id: 6, name: 'FUTSAL (misto) - 3º e 4º Ano / EF', permission: [{ course: '3º Ano' }, { course: '4º Ano' }] },
    { id: 7, name: 'FUTSAL (fem) - 5º Ano / EF', permission: [{ course: '5º Ano' }] },
    { id: 8, name: 'JUDÔ - 1º e 2º Ano / EF', permission: [{ course: '1º Ano' }, { course: '2º Ano' }] },
    { id: 9, name: 'JUDÔ - 3º ao 5º Ano / EF', permission: [{ course: '3º Ano' }, { course: '4º Ano' }, { course: '5º Ano' }] },
    { id: 10, name: 'JUDÔ - 6º ao 9º Ano / EF', permission: [{ course: '6º Ano' }, { course: '7º Ano' }, { course: '8º Ano' }, { course: '9º Ano' }] },
    { id: 11, name: 'CAPOEIRA - 1º e 2º Ano / EF', permission: [{ course: '1º Ano' }, { course: '2º Ano' }] },
    { id: 12, name: 'CAPOEIRA - 3º Ano / EF', permission: [{ course: '3º Ano' }] },
    { id: 13, name: 'CAPOEIRA - 6º ao 9º Ano / EF', permission: [{ course: '6º Ano' }, { course: '7º Ano' }, { course: '8º Ano' }, { course: '9º Ano' }] },
    { id: 14, name: 'CAPOEIRA - 4º e 5º Ano / EF', permission: [{ course: '4º Ano' }, { course: '5º Ano' }] },
    { id: 15, name: 'HANDEBOL - 3º ao 5º Ano / EF', permission: [{ course: '3º Ano' }, { course: '4º Ano' }, { course: '5º Ano' }] },
    { id: 16, name: 'HANDEBOL - 6º ao 8º Ano / EF', permission: [{ course: '6º Ano' }, { course: '7º Ano' }, { course: '8º Ano' }] },
    { id: 17, name: 'HANDEBOL - 9º Ano a 3ª Série / EF', permission: [{ course: '9º Ano' }, { course: '1ª Série' }, { course: '2ª Série' }, { course: '3ª Série' }] },
    { id: 18, name: 'ESCOLA DA BOLA - 1º Ano / EF', permission: [{ course: '1º Ano' }] },
    { id: 19, name: 'ESCOLA DA BOLA - 2º Ano / EF', permission: [{ course: '2º Ano' }] },
    { id: 20, name: 'BASQUETE - 3º ao 5º Ano / EF', permission: [{ course: '3º Ano' }, { course: '4º Ano' }, { course: '5º Ano' }] },
    { id: 21, name: 'BASQUETE - 6º ao 8º Ano / EF', permission: [{ course: '6º Ano' }, { course: '7º Ano' }, { course: '8º Ano' }] },
    { id: 22, name: 'BASQUETE - 9º Ano a 3ª Série / EF', permission: [{ course: '9º Ano' }, { course: '1ª Série' }, { course: '2ª Série' }, { course: '3ª Série' }] },
    { id: 23, name: 'VOLEIBOL - 6º e 7º Ano / EF', permission: [{ course: '6º Ano' }, { course: '7º Ano' }] },
    { id: 24, name: 'VOLEIBOL - 3º ao 5º Ano / EF', permission: [{ course: '3º Ano' }, { course: '4º Ano' }, { course: '5º Ano' }] },
    { id: 25, name: 'VOLEIBOL - 8º Ano a 3ª Série / EF', permission: [{ course: '8º Ano' }, { course: '9º Ano' }, { course: '1ª Série' }, { course: '2ª Série' }, { course: '3ª Série' }] },
];


const OficinasCulturais = [
    { id: 1, name: 'CORAL - 1º e 2º /EF', permission: [{ course: '1º Ano' }, { course: '2º Ano' }] },
    { id: 2, name: 'CORAL -  3º /EF ao E. Médio', permission: [{ course: '3º Ano' }, { course: '4º Ano' }, { course: '5º Ano' }, { course: '6º Ano' }, { course: '7º Ano' }, { course: '8º Ano' }, { course: '9º Ano' }, { course: '1ª Série' }, { course: '2ª Série' }, { course: '3ª Série' }] },
    { id: 3, name: 'DESENHO ARTÍSTICO - 4º e 5º /EF', permission: [{ course: '4º Ano' }, { course: '5º Ano' }] },
    { id: 4, name: 'DESENHO ARTÍSTICO - 6º /EF ao E. Médio', permission: [{ course: '6º Ano' }, { course: '7º Ano' }, { course: '8º Ano' }, { course: '9º Ano' }, { course: '1ª Série' }, { course: '2ª Série' }, { course: '3ª Série' }] },
    { id: 5, name: 'FLAUTA - 2º ao 5º /EF', permission: [{ course: '2º Ano' }, { course: '3º Ano' }, { course: '4º Ano' }, { course: '5º Ano' }] },
    { id: 6, name: 'UKULELE - 5º /EF ao E. Médio', permission: [{ course: '5º Ano' }, { course: '6º Ano' }, { course: '7º Ano' }, { course: '8º Ano' }, { course: '9º Ano' }, { course: '1ª Série' }, { course: '2ª Série' }, { course: '3ª Série' }] },
    { id: 7, name: 'XADREZ - 2º ao 5º /EF', permission: [{ course: '2º Ano' }, { course: '3º Ano' }, { course: '4º Ano' }, { course: '5º Ano' }] },
    { id: 8, name: 'XADREZ - 6º /EF ao E. Médio', permission: [{ course: '6º Ano' }, { course: '7º Ano' }, { course: '8º Ano' }, { course: '9º Ano' }, { course: '1ª Série' }, { course: '2ª Série' }, { course: '3ª Série' }] },

];

const subscriptionSchema = z.object({
    studentId: z.string().optional(),
    studentName: z.string(),
    courseName: z.string(),
    userAnswer: z.string(),
    answered: z.boolean(),
    answerTime: z.date(),
    priority: z.custom((value) => value === 'Esportiva' || value === 'Cultural', { message: 'Selecione uma atividade prioritária' }),
    esportiveActivity: z.string().nullable(),
    culturalActivity: z.string().nullable(),
    optionActivity: z.string().optional().nullable(),
});

export const NightactivitiesSubscritionForm = ({ responsible, subscription }: { responsible: any, subscription?: NightactivitiesSubscriptionInput }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const { student } = useGetAgendaEduStudentInfo({ responsible });

    const { register, handleSubmit, formState: { errors } } = useForm<NightactivitiesSubscriptionInput>({
        resolver: zodResolver(subscriptionSchema),
        defaultValues: {
            studentId: student.id,
            studentName: student.name,
            courseName: student.course,
            userAnswer: responsible.data.attributes.email,
            answered: true,
            answerTime: new Date(),
            priority: subscription?.priority !== undefined ? subscription.priority : 'Não se aplica',
            esportiveActivity: subscription?.esportiveActivity !== undefined ? subscription.esportiveActivity : 'Não se aplica',
            culturalActivity: subscription?.culturalActivity !== undefined ? subscription.culturalActivity : 'Não se aplica',
            optionActivity: subscription?.optionActivity !== undefined ? subscription.optionActivity : 'Não se aplica',
        }
    });

    const onSubmit: SubmitHandler<NightactivitiesSubscriptionInput> = async data => {
        setLoading(true);

        const response = await fetch('/api/strapi/', {
            cache: 'no-store',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'method': 'POST',
                'path': `/api/night-activies/`
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
            alert('Erro ao realizar a inscrição!');
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* include validation with required or other standard HTML validation rules */}

            <div className="mb-5">
                <label htmlFor="studantName" className="block mb-2 text-sm font-medium text-gray-900">Nome do Aluno(a)</label>
                <input disabled type="studantName" {...register("studentName")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>

            <div className="mb-5">
                <label htmlFor="courseName" className="block mb-2 text-sm font-medium text-gray-900">Série</label>
                <input disabled type="courseName" {...register("courseName")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>

            <div className="text-center mb-5">
                {errors.priority && <FieldErrorBoundary>{errors.priority.message}</FieldErrorBoundary>}
                <label htmlFor="courseName" className="block mb-2 text-sm font-medium text-gray-900">Deseja que a primeira opção seja</label>
                <fieldset className="flex justify-center gap-12 items-center">

                    <div className="flex">


                        <input id="esportiva" {...register("priority")} type="radio" value="Esportiva" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300" />
                        <label htmlFor="esportiva" className="block ms-2  text-sm font-medium text-gray-900">
                            Esportiva
                        </label>

                    </div>

                    <div className="flex">
                        <input id="cultural" type="radio" {...register("priority")} value="Cultural" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300" />
                        <label htmlFor="cultural" className="block ms-2 text-sm font-medium text-gray-900">
                            Cultural
                        </label>
                    </div>

                </fieldset>
            </div>

            <div className="mb-5">
                {errors.esportiveActivity && <FieldErrorBoundary>{errors.esportiveActivity.message}</FieldErrorBoundary>}
                <label htmlFor="esportiva" className="block mb-2 text-sm font-medium text-gray-900 ">Escolha a atividade esportiva:</label>
                <select {...register("esportiveActivity")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option value="Não se aplica" >Não se aplica</option>    
                    {OficinasEsportivas.map((modalidade, index) =>
                        modalidade.permission.map((permissao, index) => (
                            (permissao.course == student.course) && <option key={index} value={modalidade.name}>{modalidade.name}</option>
                        ))
                    )}

                </select>
            </div>

            <div className="mb-5">
                {errors.culturalActivity && <FieldErrorBoundary>{errors.culturalActivity.message}</FieldErrorBoundary>}
                <label htmlFor="cultural" className="block mb-2 text-sm font-medium text-gray-900 ">Escolha a atividade cultural:</label>
                <select {...register("culturalActivity")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option value="Não se aplica" >Não se aplica</option>
                    {OficinasCulturais.map((modalidade, index) =>
                        modalidade.permission.map((permissao, index) => (
                            (permissao.course == student.course) && <option key={index} value={modalidade.name}>{modalidade.name}</option>
                        ))
                    )}

                </select>
            </div>

            <div className="mb-5">
                <label htmlFor="optional" className="block mb-2 text-sm font-medium text-gray-900 ">Escolha uma atividade esportiva ou cultural (3º Opção):</label>
                <select {...register("optionActivity")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <option value="Não se aplica" >Não se aplica</option>
                    {OficinasEsportivas.map((modalidade, index) =>
                        modalidade.permission.map((permissao, index) => (
                            (permissao.course == student.course) && <option key={index} value={modalidade.name}>{modalidade.name}</option>
                        ))
                    )}

                    {OficinasCulturais.map((modalidade, index) =>
                        modalidade.permission.map((permissao, index) => (
                            (permissao.course == student.course) && <option key={index} value={modalidade.name}>{modalidade.name}</option>
                        ))
                    )}

                </select>
            </div>

            <div className='text-sm font-semibold text-justify mb-3 mt-10'>*Verifique as modalidades antes de Enviar</div>
            <button disabled={loading} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Enviar</button>
        </form>
    )

}