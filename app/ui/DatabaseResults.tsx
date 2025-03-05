import { fetchDatabaseDecisions } from "../actions/actions";

export default async function DatabaseResults() {
  const decisions = await fetchDatabaseDecisions();
  console.log(decisions);
  return (
    <div>
      {decisions.map((decision) => (
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
