"use client";

import { fetchDatabaseDecisions } from "../actions/actions";
import { useState, useEffect } from "react";
import { DecisionData } from "../utils/definitions";

export default function DatabaseResults() {
  const [decisions, setDecisions] = useState<DecisionData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDecisions, setFilteredDecisions] = useState<DecisionData[]>(
    []
  );

  useEffect(() => {
    async function fetchData() {
      const data = JSON.parse(await fetchDatabaseDecisions());
      setDecisions(data);
      setFilteredDecisions(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredDecisions(
      decisions.filter(
        (decision) =>
          decision.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
          decision.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, decisions]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by Model or ID..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white mb-4"
      />
      {filteredDecisions.map((decision) => (
        <div
          key={decision.id}
          className="p-4 mt-4 border border-gray-700 rounded-lg bg-gray-800 cursor-pointer"
        >
          <h2 className="text-lg font-bold text-white">
            Model: {decision.model}
          </h2>
          <p className="text-gray-400">Decision: {decision.decision}</p>
          <p className="text-gray-400">ID: {decision.id}</p>
          <p className="text-gray-400">
            Confidence: {decision.confidence.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
}
