'use client'

import { OlympicShirtForm } from "@/components/Responsible/components/olympics/shirt/olympic-shirt-form";
import { useUser } from "@/contexts/useCurrentUser";

export default function OlympicShirtPage() {
    const { user } = useUser();

    return (
        <div className="p-2 w-full">
            <div className="text-center">
                <h1 className="mb-5 font-bold text-gray-800">Camisa da Olimpíada das Bandeiras</h1>
                <OlympicShirtForm responsible={user} studentAccess={false} />
            </div>
        </div>
    )
}