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
  scores: ScoreRecord;

  setUser: (user: string | null) => void;
  setComplexity: (complexity: number) => void;
  setOperations: (operations: OPERATIONS[]) => void;
  addScore: (score: Record<string, Date>) => void;
}

const storeContextInitial: StoreContextProps = {
  user: null,
  complexity: 0,
  operations: [],
  scores: {},

  setUser: () => {},
  setComplexity: () => {},
  setOperations: () => {},
  addScore: () => {},
};

interface StoreContextProviderProps {
  children: React.ReactNode;
}

interface ScoreRecord {
  [score: string]: Date;
}

const StoreContext = createContext(storeContextInitial);

export const StoreContextProvider = ({
  children,
}: StoreContextProviderProps) => {
  const [hasMounted, setHasMounted] = useState(false);

  const [user, setUser] = useState<string | null>(null);
  const [complexity, setComplexity] = useState<number>(0);
  const [operations, setOperations] = useState<OPERATIONS[]>([]);
  const [scores, setScores] = useState<ScoreRecord>({});

  useEffect(() => {
    setUser(browserStorage.get(STORAGE_KEYS.USER, null));
    setComplexity(JSON.parse(browserStorage.get(STORAGE_KEYS.COMPLEXITY, "0")));
    setOperations(
      JSON.parse(browserStorage.get(STORAGE_KEYS.OPERATIONS, "[]"))
    );
    setScores(JSON.parse(browserStorage.get(STORAGE_KEYS.SCORES, "{}")));
    setHasMounted(true);
  }, []);

  const addScore = (score: Record<string, Date>) => {
    setScores((prev) => ({
      ...prev,
      ...score,
    }));
  };

  if (!hasMounted) return null;

  return (
    <StoreContext.Provider
      value={{
        user,
        complexity,
        operations,
        scores,
        setUser,
        setComplexity,
        setOperations,
        addScore,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => useContext(StoreContext);
