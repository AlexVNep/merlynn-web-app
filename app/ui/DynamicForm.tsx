"use client";

import { useState } from "react";
import {
  Attribute,
  DecisionData,
  EndpointState,
  Value,
} from "../utils/definitions";
import { formSubmit } from "../actions/actions";
import DecisionCard from "./DecisionCard";

export default function DynamicFormComponent({
  state,
}: {
  state: EndpointState;
}) {
  const [decision, setDecision] = useState<DecisionData | null>(null);
  const [showForm, setShowForm] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log(state);
  if (
    !state ||
    !state.data ||
    !("metadata" in state.data) ||
    !state.data.metadata.attributes
  ) {
    return <p className="text-red-500">Invalid API response</p>;
  }

  const { attributes } = state.data.metadata;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.target as HTMLFormElement);
    const gender = formData.get("Gender?");
    const pregnant = formData.get("Pregnant?");
    const drinksToday = Number(
      formData.get("Number of drinks consumed today?")
    );
    const drinksPerDay = Number(
      formData.get("Number of drinks consumed per day?")
    );

    // Apply exclusion rule: If Gender is Male, Pregnant? must be "NA"
    if (gender === "Male" && pregnant !== "NA") {
      setError(
        "Exclusion rule triggered: If Gender is Male, Pregnancy must be NA."
      );
      return;
    }

    // Apply exclusion rule: If Gender is NOT Male, Pregnant? cannot be NA
    if (gender !== "Male" && pregnant === "NA") {
      setError(
        "Exclusion rule triggered: If Gender is not Male, Pregnancy cannot be NA."
      );
      return;
    }

    // Apply exclusion rule: If Pregnant? is NOT NA, Gender cannot be Male
    if (pregnant !== "NA" && gender === "Male") {
      setError(
        "Exclusion rule triggered: If Pregnant is not NA, Gender cannot be Male."
      );
      return;
    }

    // Apply the exclusion rule: Number of drinks consumed today must be <= Number of drinks consumed per day
    if (drinksPerDay > drinksToday) {
      setError(
        "Exclusion rule triggered: Number of drinks consumed today must be less than or equal to the Number of drinks consumed per day."
      );
      return;
    }

    if (state) {
      const response = await formSubmit(
        state,
        formData,
        state.url || "",
        state.key || "",
        state.data?.name || ""
      );
      if (response && response.data && !response.error) {
        setDecision(response.data as unknown as DecisionData);
        setShowForm(false);
      }
      console.log(response);
    }
  };

  return (
    <div className="w-full flex flex-col border-t pt-5 mt-5 justify-center">
      <div>
        <h2 className="text-2xl w-full text-center font-bold mb-6">
          {state.data.name}
        </h2>
      </div>

      {showForm ? (
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4 p-4"
        >
          {attributes.map((attr: Attribute, index: number) => (
            <div key={index}>
              <label className="block text-sm font-medium text-white">
                {attr.question}
              </label>
              {attr.domain.type === "text" ? (
                <select
                  name={attr.question}
                  className="mt-1 w-full p-2 border border-gray-400 rounded-md bg-white text-black"
                >
                  {attr.domain.values.map((val: Value, i: number) => (
                    <option key={i} value={val.value}>
                      {val.value}
                    </option>
                  ))}
                </select>
              ) : attr.domain.type === "number" ? (
                <input
                  type="number"
                  name={attr.question}
                  min={attr.domain.lowerbound}
                  max={attr.domain.upperbound}
                  className="mt-1 w-full p-2 border border-gray-400 rounded-md bg-white text-black"
                />
              ) : null}
            </div>
          ))}

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="w-full flex flex-col items-center">
          {decision && <DecisionCard decision={decision} />}
          <button
            onClick={() => {
              setShowForm(true);
              setDecision(null);
              setError(null);
            }}
            className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Make Another Submission
          </button>
        </div>
      )}
    </div>
  );
}
