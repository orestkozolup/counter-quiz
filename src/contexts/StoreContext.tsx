"use client";

import { createContext, useContext, useState, useEffect } from "react";

import { STORAGE_KEYS } from "@/const/storage";
import { OPERATIONS } from "@/const/operations";
import { BrowserStorage } from "@/browser-storage";

const browserStorage = new BrowserStorage();

interface StoreContextProps {
  user: string | null;
  complexity: number;
  operations: OPERATIONS[];

  setUser: (user: string | null) => void;
  setComplexity: (complexity: number) => void;
  setOperations: (operations: OPERATIONS[]) => void;
}

const storeContextInitial: StoreContextProps = {
  user: null,
  complexity: 0,
  operations: [],

  setUser: () => {},
  setComplexity: () => {},
  setOperations: () => {},
};

interface StoreContextProviderProps {
  children: React.ReactNode;
}

const StoreContext = createContext(storeContextInitial);

export const StoreContextProvider = ({
  children,
}: StoreContextProviderProps) => {
  const [hasMounted, setHasMounted] = useState(false);

  const [user, setUser] = useState<string | null>(null);
  const [complexity, setComplexity] = useState<number>(0);
  const [operations, setOperations] = useState<OPERATIONS[]>([]);

  useEffect(() => {
    setUser(browserStorage.get(STORAGE_KEYS.USER, null));
    setComplexity(browserStorage.get(STORAGE_KEYS.COMPLEXITY, 0));
    setOperations(browserStorage.get(STORAGE_KEYS.OPERATIONS, []));
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <StoreContext.Provider
      value={{
        user,
        complexity,
        operations,
        setUser,
        setComplexity,
        setOperations,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => useContext(StoreContext);
