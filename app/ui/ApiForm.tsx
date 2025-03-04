"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import Button from "../components/Button";

export default function ApiForm() {
  const router = useRouter();
  const [formState, setFormState] = useState({ url: "", key: "", id: "" });

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const { url, id } = formState;
      const searchParams = new URLSearchParams({
        url,
        key: formState.key,
      }).toString();

      let route;
      if (id) {
        route = `/results/${id}`;
      } else if (url.endsWith("/results")) {
        route = "/results";
      } else {
        route = "/submit";
      }

      router.push(`${route}?${searchParams}`);
    },
    [formState, router]
  );

  return (
    <div>
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
            className="mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
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
            className="mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
            value={formState.key}
            onChange={(e) =>
              setFormState({ ...formState, key: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200">
            Result ID (Optional)
          </label>
          <input
            type="text"
            placeholder="ID"
            name="id"
            id="id"
            className="mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
            value={formState.id}
            onChange={(e) => setFormState({ ...formState, id: e.target.value })}
          />
        </div>
        <div className="mt-4">
          <Button title={"Submit"} />
        </div>
      </form>
    </div>
  );
}
