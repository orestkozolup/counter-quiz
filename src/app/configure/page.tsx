"use client";

import { useStoreContext } from "@/contexts/StoreContext";
import { useState } from "react";

import { UserConfig, OperationsConfig } from "./components";
import { OPERATIONS } from "@/const/operations";

import dynamic from "next/dynamic";

const ComplexityConfig = dynamic(() => import("./components/complexity"), {
  ssr: false,
});

export const Configure = () => {
  const { user, complexity } = useStoreContext();

  const [configUser, setConfigUser] = useState<string | null>(user);
  const [configComplexity, setConfigComplexity] = useState<number>(complexity);
  const [configOperations, setConfigOperations] = useState<OPERATIONS[]>([]);

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
    </div>
  );
};

export default Configure;
