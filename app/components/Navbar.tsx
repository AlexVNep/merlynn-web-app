"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import Logout from "./LogoutButton";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className="border-b bg-background w-full flex items-center">
      <div className="flex w-full items-center justify-between my-4">
        <Link className="font-bold" href="/">
          Home
        </Link>

        <div className="flex items-center gap-x-5">
          {session ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/database">Database</Link>
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
              <Logout />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
