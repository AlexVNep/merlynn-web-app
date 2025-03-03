"use client";

import { useRouter } from "next/navigation";
import SubmitButton from "../components/SubmitButton";
import { useState } from "react";

export default function ApiForm() {
  const router = useRouter();
  const [formState, setFormState] = useState({ url: "", key: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams(formState).toString();
    router.push(`/submit?${searchParams}`);
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
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
            value={formState.url}
            onChange={(e) =>
              setFormState({ ...formState, url: e.target.value })
            }
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
            value={formState.key}
            onChange={(e) =>
              setFormState({ ...formState, key: e.target.value })
            }
          />
        </div>
        <div className="mt-4">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
