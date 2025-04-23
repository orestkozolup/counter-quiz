"use client";

import Link from "next/link";
import { useStoreContext } from "@/contexts/StoreContext";

const Welcome = () => {
  const { user } = useStoreContext();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800">
      <div className="w-full max-w-xs p-6 bg-white rounded-xl shadow-md text-center space-y-4">
        <h3 className="text-2xl font-semibold">Hi {user} 👋</h3>
        <p className="text-gray-600">Welcome to Counter Quiz</p>

        <div className="space-y-3">
          <Link
            href="/game"
            className="block w-full py-2 bg-indigo-500 text-white rounded-md text-center font-medium hover:bg-indigo-600 transition"
          >
            Play
          </Link>

          <Link
            href="/configure"
            className="block w-full py-2 bg-gray-200 text-gray-800 rounded-md text-center font-medium hover:bg-gray-300 transition"
          >
            ⚙️ Configure
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
