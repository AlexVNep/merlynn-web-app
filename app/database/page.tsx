import DatabaseResults from "../ui/DatabaseResults";

export default function DatabasePage() {
  return (
    <div className="w-full flex mt-5 justify-center">
      <section className="flex flex-col w-[400px] p-4 ">
        <h1 className="text-3xl w-full text-center font-bold mb-6 text-gray-200">
          Database Results
        </h1>
        <DatabaseResults />
      </section>
    </div>
  );
}
