export type Solicitation = {
    id?: any;
    solicitation_id?: any;
    requester_email: string;
    requester_name: string;
    subject: string;
    status: string;
    priority: string;
    solicitation_type: SolicitationType;
    solicitation_commentaries?: { "data": SolicitationCommentary[] };
    student_id: string;
    student_class: string;
    student_name: string;
    student_course: string;
    description: string;
    createdAt?: string;
    updatedAt?: string;
}

export type SolicitationType = {
    id?: any;
    name: string;
    department: SolicitationDepartment;
    createdAt?: string;
    updatedAt?: string;
}

export type SolicitationCommentary = {
    solicitation: Solicitation | string | number;
    description: string;
    user_email: string;
    user_name: string;
    attachment: any;
    createdAt?: string;
    updatedAt?: string;
}

export type SolicitationDepartment = {
    id?: any;
    name: string;
    responsible_email: string;
    responsible_name: string;
}