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
  const [selectedDecision, setSelectedDecision] = useState<DecisionData | null>(
    null
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

  const handleCardClick = (decision: DecisionData) => {
    if (selectedDecision?.id === decision.id) {
      setSelectedDecision(null);
    } else {
      setSelectedDecision(decision);
    }
  };

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
          onClick={() => handleCardClick(decision)}
        >
          <h2 className="text-lg font-bold text-white">
            Model: {decision.model}
          </h2>
          <p className="text-gray-400">Decision: {decision.decision}</p>
          <p className="text-gray-400">ID: {decision.id}</p>
          <p className="text-gray-400">
            Confidence: {decision.confidence.toFixed(2)}
          </p>

          {/* Show additional information when the decision is selected */}
          {selectedDecision?.id === decision.id && (
            <div className="mt-2 p-4 bg-gray-700 rounded-md border border-gray-600 -mx-14  w-[450px] -my-5 z-10 overflow-hidden">
              <h3 className="font-semibold text-white">Model Input:</h3>
              <pre className="text-gray-400 break-words">
                {JSON.stringify(decision.modelInput, null, 2)}
              </pre>

              <h3 className="font-semibold text-white mt-4">User Input:</h3>
              <pre className="text-gray-400 break-words">
                {JSON.stringify(decision.userInput, null, 2)}
              </pre>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
