"use client";

import { useEffect } from "react";
import Link from "next/link";

import { STORAGE_KEYS } from "@/const/storage";
import { useStoreContext } from "@/contexts/StoreContext";

export const Welcome = () => {
  const { user, setUser } = useStoreContext();

  useEffect(() => {
    const cachedUser = localStorage.getItem(STORAGE_KEYS.USER);

    if (cachedUser) {
      setUser(cachedUser);
    }
  }, []);

  return (
    <div>
      <h3>Hi {user}!</h3>
      <p>Welcome to Counter Quiz</p>
      <Link href="/game">Play</Link>
      <Link href="/configure">Configure</Link>
    </div>
  );
};

export default Welcome;
