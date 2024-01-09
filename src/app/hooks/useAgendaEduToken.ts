import { useSearchParams } from 'next/navigation'

export default function useAgendaEduToken() {

    const searchParams = useSearchParams()

    const hasToken = searchParams.has('token');

    const token = searchParams.get('token')

    let currentUser: any = null;

    async function fetchCurrentUser() {
        const response = await fetch(`https://api.agendaedu.com/v2/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const jsonData = await response.json();

        console.log(jsonData)

        currentUser = jsonData;
    }


    if (!currentUser) fetchCurrentUser();

    try {
        let currentUserRole = null;
        let isAuthorized = false;

        if (currentUser && currentUser.data && !currentUser.errors) {
            currentUserRole = currentUser.data.attributes.role;
            isAuthorized = true;
        }
        else {
            currentUser = undefined;
        }

        return { currentUser, currentUserRole, hasToken, isAuthorized }
    }
    catch (error) {
        return { error }
    }
}

