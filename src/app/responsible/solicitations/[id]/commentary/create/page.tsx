'use client'
import SolicitationsCommentaryCreateForm from "@/components/Responsible/components/solicitations/commentary/solicitations-commentary-create-form"
import { useUser } from "@/contexts/useCurrentUser";

export default function SolicitationCommentaryCreatePage({ params }: { params: { id: string } }) {
    const { user }  = useUser();

    const { id } = params;

    return (
        <div>
            <SolicitationsCommentaryCreateForm responsible={user} solicitation_id={parseInt(id)} />
        </div>
    )
}