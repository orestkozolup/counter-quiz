"use client";

import { useStoreContext } from "@/contexts/StoreContext";
import { useRouter } from "next/navigation";

const Scores = () => {
  const { scores } = useStoreContext();
  const router = useRouter();

  const handleBackToGame = () => {
    router.push("/game");
  };

  return (
    <div className="flex flex-col min-h-screen p-6 bg-white text-gray-900">
      <h2 className="text-center text-2xl font-semibold text-gray-800">
        Your Scores Record
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Here is the list of your past scores with the corresponding dates:
      </p>

      <div className="flex-grow overflow-auto">
        <ul className="space-y-3">
          {Object.entries(scores)
            .sort((a: any, b: any) => {
              return b[0] - a[0];
            })
            .map(([score, dateStr]) => {
              const date = new Date(dateStr);

              const day = date.getDate();
              const month = date.getMonth() + 1;
              const year = date.getFullYear();

              const timestamp = date.getTime();

              return (
                <li
                  key={timestamp}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition duration-200"
                >
                  <span className="text-lg font-medium text-gray-800">
                    {score}
                  </span>
                  <span className="text-sm text-gray-500">
                    {day}/{month}/{year}
                  </span>
                </li>
              );
            })}
        </ul>
      </div>

      <div className="mt-6">
        <button
          onClick={handleBackToGame}
          className="w-full py-3 px-4 rounded-lg text-lg font-semibold bg-indigo-500 text-white hover:bg-indigo-600 transition"
        >
          Back to Game
        </button>
      </div>
    </div>
  );
};

export default Scores;
