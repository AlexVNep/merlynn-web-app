"use client";

import { useState } from "react";
import Link from "next/link";
import { ApiResultResponse } from "../utils/definitions";

export default function ResultCard({
  endpointResult,
}: {
  endpointResult: ApiResultResponse[];
}) {
  const [searchId, setSearchId] = useState("");

  const filteredResults = endpointResult.filter((result) =>
    result.id.includes(searchId)
  );

  return (
    <div className="space-y-4 mt-4">
      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search by ID..."
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        className="p-2 border border-gray-600 rounded-lg w-full bg-gray-700 text-white"
      />

      {/* 🔹 Display Filtered Results */}
      {filteredResults.length > 0 ? (
        filteredResults.map((result) => (
          <Link key={result.id} href={`/results/${result.id}`}>
            <div className="p-4 border border-gray-700 rounded-lg bg-gray-800 cursor-pointer hover:bg-gray-700 transition">
              <h2 className="text-lg font-bold text-white">
                Decision: {result.decision}
              </h2>
              <p className="text-gray-400">ID: {result.id}</p>
              <p className="text-gray-400">
                Confidence: {result.confidence.toFixed(2)}
              </p>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-red-500">No results found</p>
      )}
    </div>
  );
}
