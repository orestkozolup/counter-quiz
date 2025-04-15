import { createContext, useContext, useState } from "react";

interface StoreContextProps {
  user: string | null;
  setUser: (user: string | null) => void;
}

const storeContextInitial: StoreContextProps = {
  user: null,
  setUser: (user: string | null) => {},
};

interface StoreContextProviderProps {
  children: React.ReactNode;
}

const StoreContext = createContext(storeContextInitial);

export const StoreContextProvider = ({
  children,
}: StoreContextProviderProps) => {
  const [user, setUser] = useState<string | null>("Hello from context");

  return (
    <StoreContext.Provider value={{ user, setUser }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => useContext(StoreContext);
