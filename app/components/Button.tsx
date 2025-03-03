"use client";
import { useFormStatus } from "react-dom";

export default function Button({ title }: { title: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className={`${
        pending ? "bg-gray-600" : "bg-blue-600"
      } rounded-md w-full px-12 py-3 text-sm font-medium text-white`}
    >
      {pending ? "Loading..." : `${title}`}
    </button>
  );
}
