"use client";

import { useStoreContext } from "@/contexts/StoreContext";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { UserConfig, OperationsConfig } from "./components";
import { OPERATIONS } from "@/const/operations";
import { STORAGE_KEYS } from "@/const/storage";
import { Button } from "@/components/ui/button";

const ComplexityConfig = dynamic(() => import("./components/complexity"), {
  ssr: false,
});

const Configure = () => {
  const router = useRouter();
  const { user, complexity, operations, syncStore } = useStoreContext();

  const t = useTranslations();

  const [configPage, setConfigPage] = useState<number>(0);

  const [configUser, setConfigUser] = useState<string | null>(user);
  const [configComplexity, setConfigComplexity] = useState<number>(complexity);
  const [configOperations, setConfigOperations] =
    useState<OPERATIONS[]>(operations);

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEYS.USER, configUser || "");
    localStorage.setItem(STORAGE_KEYS.COMPLEXITY, configComplexity.toString());
    localStorage.setItem(
      STORAGE_KEYS.OPERATIONS,
      JSON.stringify(configOperations)
    );

    syncStore();

    router.push("/game");
  };

  const isBackBtnHidden = configPage === 0;
  const isNextBtnHidden = (configPage === 0 && !configUser) || configPage === 2;
  const isSaveBtnVisible =
    configPage === 2 && configUser && configOperations.length > 0;

  const areButtonsVisible =
    !isBackBtnHidden || !isNextBtnHidden || isSaveBtnVisible;

  return (
    <div className="w-full min-h-screen flex flex-col text-gray-800 pt-16">
      <h3 className="text-center text-xl font-semibold mt-6 mb-4 text-gray-800">
        {t("configure_settings")}
      </h3>

      <div className="flex-grow flex items-center justify-center overflow-auto px-4">
        {configPage === 0 && (
          <UserConfig configUser={configUser} setConfigUser={setConfigUser} />
        )}
        {configPage === 1 && (
          <ComplexityConfig
            configComplexity={configComplexity}
            setConfigComplexity={setConfigComplexity}
          />
        )}
        {configPage === 2 && (
          <OperationsConfig
            configOperations={configOperations}
            setConfigOperations={setConfigOperations}
          />
        )}
      </div>

      <div className="sticky bottom-0 bg-white border-t p-4 flex justify-between gap-4 shadow-lg">
        {areButtonsVisible ? (
          <>
            {!isBackBtnHidden && (
              <Button
                onClick={() => setConfigPage((prev) => Math.max(prev - 1, 0))}
                className="flex-1"
                variant="secondary"
                disabled={configPage === 0}
              >
                {t("back")}
              </Button>
            )}

            {!isNextBtnHidden && (
              <Button
                onClick={() => setConfigPage((prev) => Math.min(prev + 1, 2))}
                className="flex-1"
              >
                {t("next")}
              </Button>
            )}

            {isSaveBtnVisible && (
              <Button onClick={handleSave} className="flex-1">
                {t("save_and_play")}
              </Button>
            )}
          </>
        ) : (
          <div className="h-[40px] w-full"></div>
        )}
      </div>
    </div>
  );
};

export default Configure;
