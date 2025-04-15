"use client";

import Link from "next/link";

import { useStoreContext } from "@/contexts/StoreContext";

export const Welcome = () => {
  const { user } = useStoreContext();

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
