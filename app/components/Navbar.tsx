"use client";

import Link from "next/link";
// import Logout from "../ui/Logout";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  return (
    <nav className="border-b bg-background w-full flex items-center">
      <div className="flex w-full items-center justify-between my-4">
        <Link className="font-bold" href="/">
          Home
        </Link>

        <div className="flex items-center gap-x-5">
          {status === "loading" ? (
            <p>Loading...</p> // Show a loading state while session loads
          ) : session ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
            </>
          ) : null}
        </div>

        <div className="flex items-center gap-x-5">
          {!session ? (
            <Link href="/login">
              <div className="bg-blue-600 text-white text-sm px-4 py-2 rounded-sm">
                Login
              </div>
            </Link>
          ) : (
            <>
              <div className="flex items-center gap-x-2 text-sm">
                {session?.user?.email}
              </div>
              {/* <Logout /> */}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
