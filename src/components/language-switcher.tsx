"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

function getCookie(name: string): string | null {
  const cookies = Object.fromEntries(
    document.cookie.split("; ").map((cookie) => {
      const [key, value] = cookie.split("=");
      return [key, value];
    })
  );
  return cookies[name] ?? null;
}

export default function LanguageSwitcher() {
  const [currentLocale, setCurrentLocale] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setCurrentLocale(getCookie("locale") || "en");
  }, []);

  const switchLanguage = (locale: string) => {
    document.cookie = `locale=${locale}; path=/`;
    setCurrentLocale(locale);
    router.refresh();
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex space-x-3 bg-white rounded-lg shadow-lg px-2 py-1">
      <Button
        onClick={() => switchLanguage("en")}
        variant={currentLocale === "en" ? "default" : "secondary"}
      >
        🇬🇧 EN
      </Button>
      <Button
        onClick={() => switchLanguage("ua")}
        variant={currentLocale === "ua" ? "default" : "secondary"}
      >
        🇺🇦 УК
      </Button>
    </div>
  );
}
