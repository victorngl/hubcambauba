'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function useAgendaEduToken({ setCurrentUser }) {
    const searchParams = useSearchParams();
    const hasToken = searchParams.has('token');
    const token = searchParams.get('token');
    
    console.log(token);
    
    const [userData, setUserData] = useState<any>({
        currentUser: null,
        currentUserRole: null,
        isAuthorized: false,
        isLoading: true,
        error: null,
    });

    useEffect(() => {
        async function fetchCurrentUser() {
            try {
                const response = await fetch(`https://api.agendaedu.com/v2/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const jsonData = await response.json();

                if (jsonData.errors) {
                    setUserData((prevUserData: any) => ({
                        ...prevUserData,
                        error: jsonData.errors,
                        isLoading: false,
                    }));
                } else {
                    setUserData((prevUserData: any) => ({
                        currentUser: jsonData,
                        currentUserRole: jsonData.data.attributes.role,
                        isAuthorized: true,
                        isLoading: false,
                        error: null,
                    }));

                    setCurrentUser(jsonData);
                }

            } catch (error) {
                console.error('Error fetching user:', error);
                setUserData((prevUserData: any) => ({
                    ...prevUserData,
                    error,
                    isLoading: false,
                }));
            }
        }

        if (hasToken) {
            fetchCurrentUser();
        } else {
            // Handle the case when there is no token
            setUserData((prevUserData: any) => ({
                ...prevUserData,
                error: 'No token found',
                isLoading: false,
            }));
        }
    }, [hasToken, token, setCurrentUser]);

    return userData;
}
