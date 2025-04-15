import { createContext, useContext, useState, useEffect } from "react";

import { STORAGE_KEYS } from "@/const/storage";

interface StoreContextProps {
  user: string | null;
  complexity: number;

  setUser: (user: string | null) => void;
  setComplexity: (complexity: number) => void;
}

const storeContextInitial: StoreContextProps = {
  user: null,
  complexity: 0,

  setUser: (user: string | null) => {},
  setComplexity: (complexity: number) => {},
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

  useEffect(() => {
    const cachedUser = localStorage.getItem(STORAGE_KEYS.USER);
    const cachedComplexity = localStorage.getItem(STORAGE_KEYS.COMPLEXITY);

    if (cachedUser) {
      setUser(cachedUser);
    }
  }, []);

  return (
    <StoreContext.Provider value={{ user, complexity, setUser, setComplexity }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => useContext(StoreContext);
