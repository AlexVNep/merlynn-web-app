"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { endpointGET } from "../actions/actions";
import DynamicForm from "../ui/DynamicForm";
import { EndpointState } from "../utils/definitions";

export default function SubmitPage() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url");
  const key = searchParams.get("key");

  const [state, setState] = useState<EndpointState>();

  useEffect(() => {
    const fetchData = async () => {
      if (url && key) {
        try {
          const formData = new FormData();
          formData.append("url", url);
          formData.append("key", key);

          const response = await endpointGET(formData);
          setState(response);
        } catch (error) {
          if (error instanceof Error) {
            setState({ error: error.message, message: undefined });
          } else {
            setState({
              error: "An unknown error occurred",
              message: undefined,
            });
          }
        }
      }
    };

    fetchData();
  }, [url, key]);

  return (
    <div className="w-full flex mt-5 justify-center">
      <section className="flex flex-col w-[400px]">
        <h1 className="text-3xl font-bold text-center text-gray-200">
          API Submission
        </h1>
        {state ? <DynamicForm state={state} /> : <p>Loading...</p>}
      </section>
    </div>
  );
}
