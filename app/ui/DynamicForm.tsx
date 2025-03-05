"use client";

import { useState } from "react";
import {
  Attribute,
  DecisionData,
  EndpointState,
  ExclusionCondition,
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

  if (
    !state ||
    !state.data ||
    !state.data.metadata ||
    !state.data.metadata.attributes
  ) {
    return <p className="text-red-500">Invalid API response</p>;
  }

  const { attributes, exclusions } = state.data.metadata;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.target as HTMLFormElement);
    const inputValues: Record<string, string | number | null> = {};
    attributes.forEach((attr) => {
      const value = formData.get(attr.question);
      inputValues[attr.question] = typeof value === "string" ? value : null;
    });

    // Apply exclusion rules dynamically
    for (const rule of exclusions) {
      const failingConditions: string[] = [];

      if (rule.type === "ValueEx") {
        const antecedentMet =
          Array.isArray(rule.antecedent) &&
          rule.antecedent.every((cond: ExclusionCondition) => {
            return evalCondition(inputValues, cond);
          });

        const consequentMet =
          Array.isArray(rule.consequent) &&
          rule.consequent.every((cond: ExclusionCondition) => {
            return evalCondition(inputValues, cond);
          });

        if (antecedentMet && !consequentMet) {
          // Find which consequent conditions failed
          if (Array.isArray(rule.consequent)) {
            rule.consequent.forEach((cond: ExclusionCondition) => {
              if (!evalCondition(inputValues, cond)) {
                const attr =
                  typeof cond.index === "number"
                    ? attributes[cond.index]
                    : undefined;
                failingConditions.push(
                  `${attr?.question} should be ${cond.threshold}`
                );
              }
            });
          }

          setError(
            `Exclusion rule triggered: Invalid input combination. \n Issues: ${failingConditions.join(
              ", "
            )}`
          );
          return;
        }
      } else if (rule.type === "RelationshipEx") {
        if (rule.relation && !evalCondition(inputValues, rule.relation)) {
          if (
            typeof rule.relation.index === "number" &&
            typeof rule.relation.threshold === "number"
          ) {
            const attrA = attributes[rule.relation.index]; // Left-side attribute
            const attrB = attributes[rule.relation.threshold]; // Right-side attribute

            if (attrA && attrB) {
              failingConditions.push(
                `${attrA.question} must be ${
                  rule.relation.type === "LTEQ" ? "≤" : ">"
                } ${attrB.question}`
              );
            }
          }

          setError(
            `Exclusion rule triggered: Relationship constraint violated. \n Issues: ${failingConditions.join(
              ", "
            )}`
          );
          return;
        }
      }
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
    }
  };

  const evalCondition = (
    inputs: Record<string, string | number | null>,
    condition: ExclusionCondition
  ) => {
    const { index, threshold, type } = condition;

    if (type === "LTEQ" || type === "GTEQ") {
      // RelationshipEx case: threshold refers to another attribute
      if (typeof index === "number" && typeof threshold === "number") {
        const attrA = attributes[index]; // Left-side attribute
        const attrB = attributes[threshold]; // Right-side attribute

        if (!attrA || !attrB) return false;

        const valueA = Number(inputs[attrA.question]);
        const valueB = Number(inputs[attrB.question]);

        if (isNaN(valueA) || isNaN(valueB)) return false;

        return type === "LTEQ" ? valueA <= valueB : valueA > valueB;
      }
    } else {
      // Standard ValueEx cases
      const attr = typeof index === "number" ? attributes[index] : undefined;
      if (!attr) return false;

      const value = inputs[attr.question];
      if (type === "EQ") return value === threshold;
      if (type === "NEQ") return value !== threshold;
      return false;
    }
  };

  return (
    <div className="w-full flex flex-col border-t pt-5 mt-5 justify-center">
      <h2 className="text-2xl w-full text-center font-bold mb-6">
        {state.data.name}
      </h2>
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
          {error && <p className="text-red-500 whitespace-pre-line">{error}</p>}
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
