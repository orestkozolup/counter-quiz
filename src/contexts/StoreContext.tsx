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
  addScore: (score: string, date: Date) => void;
  syncStore: () => void;
}

const storeContextInitial: StoreContextProps = {
  user: null,
  complexity: 0,
  operations: [],
  scores: {},

  setUser: () => { },
  setComplexity: () => { },
  setOperations: () => { },
  addScore: () => { },
  syncStore: () => { },
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
    syncStore();
    setHasMounted(true);
  }, []);

  const addScore = (score: string, date: Date) => {
    browserStorage.set(STORAGE_KEYS.SCORES, { ...scores, [score]: date });
    syncStore();
  };

  const syncStore = () => {
    setUser(browserStorage.get(STORAGE_KEYS.USER, null));
    setComplexity(JSON.parse(browserStorage.get(STORAGE_KEYS.COMPLEXITY, "0")));
    setOperations(
      JSON.parse(browserStorage.get(STORAGE_KEYS.OPERATIONS, "[]"))
    );
    setScores(JSON.parse(browserStorage.get(STORAGE_KEYS.SCORES, "{}")));
  }

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
        syncStore
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => useContext(StoreContext);
