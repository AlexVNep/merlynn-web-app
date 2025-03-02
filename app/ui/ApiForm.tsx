"use client";

import { endpointSubmit } from "../actions/actions";
import SubmitButton from "../components/SubmitButton";
import { useActionState } from "react";
export default function ApiForm() {
  const [state, formAction] = useActionState(endpointSubmit, null);

  console.log(state);

  return (
    <div className="">
      <form action={formAction} className="w-full flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-200">
            API URL
          </label>
          <input
            type="text"
            placeholder="URL"
            id="url"
            name="url"
            className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200">
            API Key
          </label>
          <input
            type="text"
            placeholder="Key"
            name="key"
            id="key"
            className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>
        {state?.error && !state.message && (
          <p className="text-red-500">{state.error}</p>
        )}
        <div className="mt-4">
          <SubmitButton />
        </div>
      </form>
      {/* Make form component <DynamicForm data={questions}/> */}
    </div>
  );
}
