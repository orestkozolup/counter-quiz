"use client";

import { useStoreContext } from "@/contexts/StoreContext";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import SettingsAnchor from "@/components/settings-anchor";

const Scores = () => {
  const { scores } = useStoreContext();
  const router = useRouter();

  const t = useTranslations();

  const handleBackToGame = () => {
    router.push("/game");
  };

  return (
    <div>
      <SettingsAnchor />
      <div className="flex flex-col min-h-screen p-6 bg-white text-gray-900 pt-16">
        <h2 className="text-center text-2xl font-semibold text-gray-800">
          {t("scores_table")}
        </h2>
        <p className="text-center text-gray-600 mb-6">
          {t("scores_table_description")}
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
      </div>

      <div className="sticky bottom-6 z-50 px-6">
        <Button onClick={handleBackToGame} className="w-full">
          {t("back_to_game")}
        </Button>
      </div>
    </div>
  );
};

export default Scores;
