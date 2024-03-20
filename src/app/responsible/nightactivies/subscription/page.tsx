'use client'

import { NightactivitiesSubscritionForm } from "@/components/Responsible/components/nightactivies/subscription-form/NightactiviesSubscriptionForm";
import { useUser } from "@/contexts/useCurrentUser";

export default function NightactivitySubscription() {
    const { user } = useUser();

    return (
        <div className="p-2 w-full">
            <div className="text-center">
                <h1 className="mb-5 font-bold text-gray-800">Inscrição para as Atividades Complementares Noturnas</h1>
                <NightactivitiesSubscritionForm responsible={user} />
            </div>
        </div>
    )
}