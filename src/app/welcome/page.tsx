"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useStoreContext } from "@/contexts/StoreContext";
import { Button, buttonVariants } from "@/components/ui/button";

const Welcome = () => {
  const { user } = useStoreContext();

  const t = useTranslations();

  const isUserDefined = !!user;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-gray-800">
      <div className="w-full max-w-xs p-6 bg-white rounded-xl shadow-md text-center space-y-4">
        <h3 className="text-2xl font-semibold">
          {t("greeting")} {user} 👋
        </h3>
        <p className="text-gray-600">{t("welcome")}</p>

        {!isUserDefined && (
          <p className="text-gray-600">{t("settings_lack")}</p>
        )}

        <div className="space-y-3">
          <Button asChild>
            <Link
              href={!isUserDefined ? "#" : "/game"}
              className="w-full"
              onClick={(e) => {
                if (!isUserDefined) {
                  e.preventDefault();
                }
              }}
            >
              {t("play")}
            </Link>
          </Button>

          <Button asChild>
            <Link
              href="/configure"
              className={`${buttonVariants({ variant: "secondary" })} w-full`}
            >
              ⚙️ {t("settings")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
