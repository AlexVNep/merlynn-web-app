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

    if (state) {
      const response = await formSubmit(
        state,
        new FormData(e.target as HTMLFormElement),
        state.url || "",
        state.key || ""
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
