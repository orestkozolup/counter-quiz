"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { STORAGE_KEYS } from "@/const/storage";

export const Login = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem(STORAGE_KEYS.USER);

    if (user) {
      setUser(user);
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

export default Login;
