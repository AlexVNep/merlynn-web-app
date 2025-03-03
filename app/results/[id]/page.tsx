"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { ApiResultResponse } from "../../utils/definitions";

export default function ResultDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();

  // Unwrap params using `use()`
  const { id } = use(params);

  const storedData =
    typeof window !== "undefined" ? localStorage.getItem("resultsData") : null;
  const parsedData: ApiResultResponse[] = storedData
    ? JSON.parse(storedData)
    : [];

  const result = parsedData.find((item) => item.id === id);

  if (!result) {
    return (
      <div className="w-full flex mt-5 justify-center">
        <p className="text-red-500">Result not found</p>
      </div>
    );
  }

  return (
    <div className="w-full flex mt-5 justify-center">
      <section className="flex flex-col w-[400px]">
        <h1 className="text-3xl font-bold text-center text-gray-200">
          Result Details
        </h1>
        <div className="p-4 border border-gray-700 rounded-lg bg-gray-800">
          <h2 className="text-lg font-bold text-white">
            Decision: {result.decision}
          </h2>
          <p className="text-gray-400">ID: {result.id}</p>
          <p className="text-gray-400">
            Confidence: {result.confidence.toFixed(2)}
          </p>
          <pre className="text-gray-400">{JSON.stringify(result, null, 2)}</pre>
        </div>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Back to Results
        </button>
      </section>
    </div>
  );
}
