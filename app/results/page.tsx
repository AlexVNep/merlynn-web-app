"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { ApiResultResponse } from "../utils/definitions";
import { endpointResult } from "../actions/actions";
import ResultCard from "../ui/ResultCard";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url");
  const key = searchParams.get("key");

  const [state, setState] = useState<ApiResultResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (url && key) {
        try {
          const response = await endpointResult(url, key);
          console.log("Response from endpointResult:", response);

          setState(response || []); // Ensure we always set an array
          localStorage.setItem("resultsData", JSON.stringify(response || [])); // Store in localStorage
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [url, key]);

  useEffect(() => {
    console.log("Updated State:", state);
  }, [state]); // Logs when `state` changes

  return (
    <div className="w-full flex mt-5 justify-center">
      <section className="flex flex-col w-[400px]">
        <h1 className="text-3xl font-bold text-center text-gray-200">
          Decision Results
        </h1>
        {state.length > 0 ? (
          <ResultCard endpointResult={state} />
        ) : (
          <p className="text-yellow-400">Fetching data...</p>
        )}
      </section>
    </div>
  );
}
