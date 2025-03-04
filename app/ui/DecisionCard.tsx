import { DecisionData } from "../utils/definitions";

export default function DecisionCard({
  decision,
}: {
  decision: DecisionData | null;
}) {
  if (!decision) {
    return (
      <div className="w-full max-w-lg mx-auto bg-gray-800 text-white p-6 rounded-lg shadow-lg border border-gray-700">
        <p className="text-center text-gray-400">No decision available.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-gray-800 text-white p-6 rounded-lg shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold text-center mb-4">Model Decision</h2>

      <div className="space-y-2">
        <p className="text-sm text-gray-400">
          <span className="font-semibold text-white">ID:</span> {decision.id}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Decision:</span> {decision.decision}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Confidence:</span>{" "}
          {decision.confidence !== undefined && decision.confidence !== null
            ? decision.confidence.toFixed(2)
            : "N/A"}
        </p>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold border-b border-gray-600 pb-2">
          Model Input
        </h3>
        <ul className="list-disc list-inside mt-2 space-y-1">
          {decision.modelInput &&
          Object.entries(decision.modelInput).length > 0 ? (
            Object.entries(decision.modelInput).map(([key, value]) => (
              <li key={key} className="text-sm">
                <span className="font-medium text-gray-300">{key}:</span>{" "}
                {value}
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-400">No model input available.</p>
          )}
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold border-b border-gray-600 pb-2">
          User Input
        </h3>
        <ul className="list-disc list-inside mt-2 space-y-1">
          {decision.userInput &&
          Object.entries(decision.userInput).length > 0 ? (
            Object.entries(decision.userInput).map(([key, value]) => (
              <li key={key} className="text-sm">
                <span className="font-medium text-gray-300">{key}:</span>{" "}
                {value}
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-400">No user input available.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
