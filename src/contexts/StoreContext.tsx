"use client";

import { createContext, useContext, useState, useEffect } from "react";

import { STORAGE_KEYS } from "@/const/storage";
import { OPERATIONS } from "@/const/operations";

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
  const [user, setUser] = useState<string | null>(null);
  const [complexity, setComplexity] = useState<number>(0);
  const [operations, setOperations] = useState<OPERATIONS[]>([]);

  useEffect(() => {
    const cachedUser = localStorage.getItem(STORAGE_KEYS.USER);
    const cachedComplexity = localStorage.getItem(STORAGE_KEYS.COMPLEXITY);
    const cachedOperations = localStorage.getItem(STORAGE_KEYS.OPERATIONS);

    setUser(cachedUser);
    setComplexity(Number(cachedComplexity));
    setOperations(JSON.parse(cachedOperations || "[]"));
  }, []);

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
