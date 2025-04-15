"use client";

import { useStoreContext } from "@/contexts/StoreContext";
import { useState } from "react";

import { UserConfig, ComplexityConfig, OperationsConfig } from "./components";

export const Configure = () => {
  const { user, complexity } = useStoreContext();

  const [configUser, setConfigUser] = useState<string | null>(user);
  const [configComplexity, setConfigComplexity] = useState<number>(complexity);
  const [configOperations, setConfigOperations] = useState<string[]>([]);

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
