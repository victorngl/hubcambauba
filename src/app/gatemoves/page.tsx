'use client'

import { useUser } from "@/contexts/useCurrentUser";
import { useEffect, useState } from "react";

export default function Gatemoves() {

    const { user } = useUser();
    const [gatemoves, setGatemoves] = useState([]);

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
                'path': `/api/gate-moves/?filters[student_id][$eq]=${responsibleStudent.id}`
            },
            body: '',
        });

        if (!response.ok) {
            throw new Error(`Erro ao realizar a requisição: ${response.statusText}`);
        }

        const data = await response.json();

        setGatemoves(data.data.data);
    }

    useEffect(() => {
        getGatemoves();
    }, []);

    return (
        <>
            {gatemoves &&
                <>
                    <a>aaa</a>
                    {gatemoves.map(gatemove => (

                        <div key={gatemove.id} className=''>
                            {/* create a component to list gatemoves */}
                            <p>{gatemove.attributes.created_at}</p>
                            <p>{gatemove.attributes.student_id}</p>
                            <p>{gatemove.attributes.studant_name}</p>
                            {gatemove.attributes.type === 'IN' ? <p>ENTRADA</p> : <p>SAÍDA</p>}
                            <p>{gatemove.attributes.schedule}</p>

                        </div>

                    )
                    )}
                </>
            }
        </>

    )
}
