"use client";

import { useSearchParams } from "next/navigation";
import DynamicForm from "../ui/DynamicForm";

export default function DynamicFormPage() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  if (!data) {
    return <p className="text-red-500">Invalid or missing data</p>;
  }

  const parsedData = JSON.parse(decodeURIComponent(data));

  return (
    <div className="w-full flex mt-5 justify-center">
      <section>
        <h1 className="text-3xl w-full text-center font-bold mb-6">
          Dynamic Form
        </h1>
        <DynamicForm state={{ data: parsedData }} />
      </section>
    </div>
  );
}
