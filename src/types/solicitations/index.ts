export type Solicitation = {
    solicitation_id?: any;
    requester_email: string;
    requester_name: string;
    subject: string;
    status: string;
    priority: string;
    solicitation_type: SolicitationType | string;
    solicitation_commentaries?: SolicitationCommentary[];
    student_id: string;
    student_class: string;
    student_name: string;
    student_course: string;
    description: string;
}

export type SolicitationType = {
    id?: any;
    name: string;
}

export type SolicitationCommentary = {
    solicitation: Solicitation;
    commentary: string;
    user_email: string;
    user_name: string;
    attachment: JSON;
}