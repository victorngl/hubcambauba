'use client'

import { SolicitationCommentary } from "@/types/solicitations";
import SolicitationCommentaryCard from "./solicitations-commentary-card";

export default function SolicitationCommentariesLayout({ solicitation_commentaries }: { solicitation_commentaries: SolicitationCommentary[] }) {
   // const { data, error } = useSWR(`/api/solicitation-commentaries/?filters[solicitation][solicitation_id][$eq]=${solicitation.solicitation_id}&populate=*`, fetcher);

    return (
        <div>
            <ul>
                {solicitation_commentaries.length > 0 && solicitation_commentaries.map((commentary, index) => {
                    return (

                        <li key={index}>
                            <SolicitationCommentaryCard commentary={commentary} />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}