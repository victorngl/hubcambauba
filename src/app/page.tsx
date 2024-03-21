'use client'

import { CoordinatorDashboard } from "@/components/coordinator/components/dashboard/coordinator-dashboard";
import { ResponsibleDashboard } from "@/components/Responsible/components/dashboard/ResponsibleDashboard";
import { useUser } from "@/contexts/useCurrentUser";

export default function AppHome() {
  const { user } = useUser();

  if (user.data.attributes.role === "responsible")
    return (
      <>
        <ResponsibleDashboard responsible={user} />
      </>
    )

  if (user.data.attributes.role === "coordinator")
    return (
      <>
        <CoordinatorDashboard coordinator={user} />
      </>
    )
}

