"use client";
import { useSession } from "next-auth/react";
import ApiForm from "../ui/ApiForm";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <div>
      {status === "loading" ? (
        <div className="w-full flex mt-5 justify-center">
          <h1 className="text-3xl w-full text-center font-bold mb-6">
            Loading
          </h1>
        </div>
      ) : (
        <div className="w-full flex mt-5 justify-center">
          <section className="flex flex-col w-[400px] p-4 ">
            <h1 className="text-3xl w-full text-center font-bold mb-6 text-gray-200">
              API Endpoint and API Key Input Form
            </h1>
            <p className="my-4 text-center text-lg text-gray-200">
              Input the relevant API endpoint and API key into the form below.
            </p>

            <ApiForm />

            <div className="mt-6">
              <p className="text-gray-200 mb-4">
                This endpoint will perform a GET request and retrieve data for
                the specified model to produce a dynamic form.
              </p>

              <div className="bg-gray-100 p-4 rounded-md text-gray-900 shadow-sm">
                <h2 className="text-xl font-semibold mb-3">Instructions</h2>
                <p className="text-lg font-medium mb-2 ">
                  To perform a GET request:
                </p>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Input a valid API endpoint</li>
                  <li>Input a valid API Key</li>
                  <li>
                    Click &quot;submit&quot; to navigate to a dynamically
                    rendered form
                  </li>
                </ul>
                <p className="text-lg font-medium mb-2 mt-4">
                  If the endpoint ends with <code>/results</code>:
                </p>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>
                    The request will navigate you to a list of results for the
                    selected model.
                  </li>
                  <li>
                    You can view the list and select the appropriate results to
                    proceed.
                  </li>
                </ul>
                <p className="text-lg font-medium mb-2 mt-4">Example:</p>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>
                    For a standard endpoint like <code>/model</code>, you will
                    be directed to a dynamically rendered form.
                  </li>
                  <li>
                    For a results endpoint like <code>/model/results</code>, you
                    will be shown a list of available results.
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
