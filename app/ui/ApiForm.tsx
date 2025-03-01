"use client";

import { endpointSubmit } from "../actions/actions";
import SubmitButton from "../components/SubmitButton";

export default function ApiForm() {
  async function handleSubmit(formData: FormData) {
    const result = await endpointSubmit(formData);
    const questions = result.description;
    console.log(questions);
  }

  return (
    <div className="">
      <form action={handleSubmit} className="w-full flex flex-col gap-4">
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
        {/* {error && <p className="text-red-500">{error}</p>} */}
        <div className="mt-4">
          <SubmitButton />
        </div>
      </form>
      {/* Make form component <DynamicForm data={questions}/> */}
      {/* Create model for Api response  */}
    </div>
  );
}
