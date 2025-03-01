"use client";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <div>
      {status === "loading" ? (
        <h1>Loading</h1>
      ) : (
        <h1>This will be the dashboard</h1>
      )}
    </div>
  );
}
