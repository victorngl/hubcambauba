'use client'

import OlympicHeader from "@/components/Responsible/components/olympics/olympic-header";
import { OlympicShirtForm } from "@/components/Responsible/components/olympics/shirt/olympic-shirt-form";
import { useUser } from "@/contexts/useCurrentUser";

export default function OlympicStudentShirtPage() {
    const { user } = useUser();

    return (
        <div className="p-2 w-full">
            <div className="text-center">
                    <OlympicHeader />
                <OlympicShirtForm responsible={user} studentAccess={true} />
            </div>
        </div>
    )
}