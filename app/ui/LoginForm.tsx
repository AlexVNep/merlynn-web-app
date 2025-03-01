"use client";

import Link from "next/link";
import AuthButton from "../components/AuthButton";

export default function LoginForm() {
  return (
    <div className="">
      <form action="" className="w-full flex flex-col gap-4">
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
        <div className="mt-4">
          <AuthButton />
        </div>
        <div className="text-center">
          Don&apos;t have an account?
          <br />
          <Link className="text-blue-600 hover:underline" href="/register">
            Register Here.
          </Link>
        </div>
      </form>
    </div>
  );
}
