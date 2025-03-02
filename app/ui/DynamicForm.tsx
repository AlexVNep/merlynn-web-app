"use client";

import { useState } from "react";
import { Attribute, EndpointState, Value } from "../utils/definitions";

export default function DynamicFormComponent({
  state,
}: {
  state: EndpointState;
}) {
  const [formData, setFormData] = useState({});

  if (!state || !state?.data?.metadata) {
    return <p className="text-red-500">Invalid API response</p>;
  }

  const { attributes } = state?.data?.metadata;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

  return (
    <div className="w-full flex flex-col border-t pt-5 mt-15 justify-center">
      <div>
        <h2 className="text-3xl w-full text-center font-bold mb-6">
          {state.data.name}
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 p-4">
        {/* Dynamic Attributes */}
        {attributes.map((attr: Attribute, index: number) => (
          <div key={index}>
            <label className="block text-sm font-medium text-white">
              {attr.question}
            </label>
            {attr.domain.type === "text" ? (
              <select
                name={attr.question}
                onChange={handleChange}
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
                onChange={handleChange}
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
    </div>
  );
}
