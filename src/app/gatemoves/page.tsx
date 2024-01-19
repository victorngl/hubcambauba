'use client'

import { useUser } from "@/contexts/useCurrentUser";
import { useEffect, useState } from "react";

export default function Gatemoves() {

    const { user } = useUser();
    const [gatemoves, setGatemoves] = useState([]);
    const [loading, setLoading] = useState(true);

    let responsibleStudent = null;

    if (user) {
        responsibleStudent = user.included.find(o => o.type === 'family_profile');
    }

    async function getGatemoves() {
        const response = await fetch('/api/strapi/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'method': 'GET',
                'path': `/api/gate-moves/?sort[0]=schedule:desc&filters[student_id][$eq]=${responsibleStudent.id}`
            },
            body: '',
        });

        if (!response.ok) {
            throw new Error(`Erro ao realizar a requisição: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.data.data.length > 0) {
            setLoading(false);
            setGatemoves(data.data.data);
        }
    }

    useEffect(() => {
        getGatemoves();
    }, []);

    if(loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        )
    }
    return (
        <div>
            {gatemoves.length > 0 &&
                <div>
                    <h1 className="w-full text-center text-lg my-2 font-semibold shadow-sm">Movimentos da Catraca</h1>
                    <div className="flex justify-center">
                        <table className="table-auto text-center border-separate border-spacing-y-2">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Movimento</th>
                                    <th>Horário</th>
                                </tr>
                            </thead>
                            <tbody>
                                {gatemoves.map(gatemove => (

                                    <tr key={gatemove.id} className="row">
                                        <td>{gatemove.attributes.studant_name}</td>
                                        <td>{gatemove.attributes.type === 'OUT' ? <>Saída</> : <>Entrada</>}</td>
                                        <td>
                                            {gatemove.attributes.schedule && formatDate(gatemove.attributes.schedule)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            }

            
        </div>

    )
}

const formatDate = (dateString) => {
    const dataObj = new Date(dateString);
    const formattedDate =
        dataObj.getDate() +
        '/' +
        (dataObj.getMonth() + 1) +
        '/' +
        dataObj.getFullYear() +
        ' ' +
        dataObj.getHours() +
        ':' +
        dataObj.getMinutes();

    return formattedDate;
};