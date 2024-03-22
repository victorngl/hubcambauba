'use client'
import SolicitationsCommentaryCreateForm from "@/components/Responsible/components/solicitations/commentary/solicitations-commentary-create-form"
import { useUser } from "@/contexts/useCurrentUser";

export default function SolicitationCommentaryCreatePage({ params }: { params: { solicitation_id: string } }) {
    const { user }  = useUser();

    const { solicitation_id } = params;

    return (
        <div>
            <SolicitationsCommentaryCreateForm responsible={user} solicitation_id={parseInt(solicitation_id)} />
        </div>
    )
}