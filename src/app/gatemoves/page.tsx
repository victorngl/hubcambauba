'use client'

import { Loading } from "@/components/ui/utils/loading";
import { useUser } from "@/contexts/useCurrentUser";
import { useCallback, useEffect, useState } from "react";

export default function Gatemoves() {

    const { user } = useUser();
    const [gatemoves, setGatemoves] = useState([]);
    const [loading, setLoading] = useState(true);

    let responsibleStudent = null;

    if (user) {
        responsibleStudent = user.included.find(o => o.type === 'family_profile');
    }

    const getGatemoves = useCallback(async () => {
        const response = await fetch('/api/strapi/', {
            cache: 'no-store',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'method': 'GET',
                'path': `/api/gate-moves/?sort[0]=schedule:desc&pagination[start]=0&pagination[limit]=30&filters[student_id][$eq]=${responsibleStudent.id}`
            },
            body: JSON.stringify({ }),
        });

        if (!response.ok) {
            throw new Error(`Erro ao realizar a requisição: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.data.data.length > 0) {
            console.log(data.data.data);
            setGatemoves(data.data.data);
        }

        setLoading(false);

    }, [responsibleStudent.id]);

    useEffect(() => {
        getGatemoves();
    }, [getGatemoves]);

    if (loading) {
        return (
            <Loading/>
        )
    }
    return (
        <div>
            {gatemoves.length > 0 &&
                <div>
                    <div>
                    <h1 className="w-full text-center text-lg my-2 font-semibold shadow-sm">Movimentos da Catraca</h1>
                    <h1 className="w-full text-center text-xs my-2 font-semibold shadow-sm">A tabela abaixo mostra os 30 últimos movimentos da catraca</h1>

                    </div>
                    <div className="flex justify-center">
                        <table className="table-auto text-center border-separate border-spacing-y-2">
                            <thead>
                                <tr>            
                                    <th>Movimento</th>
                                    <th>Horário</th>
                                </tr>
                            </thead>
                            <tbody>
                                {gatemoves.map(gatemove => (

                                    <tr key={gatemove.id} className="row">
                                        
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