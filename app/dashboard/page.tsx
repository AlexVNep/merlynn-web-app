"use client";
import { useSession } from "next-auth/react";
import ApiForm from "../ui/ApiForm";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <div>
      {status === "loading" ? (
        <div className="w-full flex mt-5 justify-center">
          <h1 className="text-3xl w-full text-center font-bold mb-6">
            Loading
          </h1>
        </div>
      ) : (
        <div className="w-full flex mt-5 justify-center">
          <section className="flex flex-col w-[400px]">
            <h1 className="text-3xl w-full text-center font-bold mb-6">
              Form Generator
            </h1>
            <ApiForm />
          </section>
        </div>
      )}
    </div>
  );
}
