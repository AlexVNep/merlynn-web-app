"use client";
import { useSession } from "next-auth/react";
import ApiForm from "../ui/ApiForm";

export default function DecisionsPage() {
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
              Results Generator
            </h1>
            <p>
              Input the relevant API endpoint and API key into the form below.
              This endpoint must include &quot;results&quot; at the end.
              <br />
              This endpoint will perform a GET request and retrieve data for the
              specified model to produce a list of results.
            </p>
            <ApiForm />
          </section>
        </div>
      )}
    </div>
  );
}
