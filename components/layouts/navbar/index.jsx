import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-slate-200 h-14 mb-5 font-bold text-gray-600">
      <div className="container mx-auto h-full max-w-xs">
        <ul className="flex justify-between h-full items-center">
          <li className="h-full">
            <Link href="/">
              <a className="h-full flex items-center">Otentikator</a>
            </Link>
          </li>
          <li className="h-full">
            <Link href="/addkey">
              <a className="h-full flex items-center">Add Key</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
