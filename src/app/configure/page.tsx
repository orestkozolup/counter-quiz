"use client";

import { useStoreContext } from "@/contexts/StoreContext";
import { useState } from "react";
import dynamic from "next/dynamic";

import { UserConfig, OperationsConfig } from "./components";
import { OPERATIONS } from "@/const/operations";
import { STORAGE_KEYS } from "@/const/storage";

const ComplexityConfig = dynamic(() => import("./components/complexity"), {
  ssr: false,
});

export const Configure = () => {
  const { user, complexity, operations } = useStoreContext();

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
  };

  return (
    <div>
      <h3>Please configure your quiz</h3>

      <UserConfig configUser={configUser} setConfigUser={setConfigUser} />
      <ComplexityConfig
        configComplexity={configComplexity}
        setConfigComplexity={setConfigComplexity}
      />
      <OperationsConfig
        configOperations={configOperations}
        setConfigOperations={setConfigOperations}
      />

      <button onClick={handleSave}>Save Configuration</button>
    </div>
  );
};

export default Configure;
