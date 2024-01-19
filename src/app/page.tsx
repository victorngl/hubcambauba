'use client'

import { ResponsibleDashboard } from "../components/Responsible/components/dashboard/ResponsibleDashboard";
import { useUser } from "../contexts/useCurrentUser";

export default function Home() {
  const { user } = useUser();

  return (
    <ResponsibleDashboard responsible={user} />
  )
}

