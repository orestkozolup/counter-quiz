"use client";

import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";

interface UserConfigProps {
  configUser: string | null;
  setConfigUser: (user: string | null) => void;
}

export const UserConfig = ({ configUser, setConfigUser }: UserConfigProps) => {
  const t = useTranslations();

  return (
    <div className="w-full max-w-sm mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <p className="text-center text-lg font-medium text-gray-700">
        {t("enter_name")}
      </p>
      <Input
        type="text"
        value={configUser ?? ""}
        onChange={(e) => setConfigUser(e.target.value)}
        placeholder={t("your_name")}
      />
    </div>
  );
};

export default UserConfig;
