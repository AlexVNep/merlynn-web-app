"use client";

import { useRouter } from "next/navigation";
import { registerWithCreds } from "../actions/actions";
import { useState } from "react";
import Button from "../components/Button";

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    const result = await registerWithCreds(formData);

    if ("error" in result) {
      setError(result.error);
    } else if ("success" in result) {
      router.push("/login");
    }
  }
  return (
    <div>
      <form action={handleSubmit} className="w-full flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-200">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            id="Email"
            name="email"
            className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mt-4">
          <Button title={"Register"} />
        </div>
      </form>
    </div>
  );
}
