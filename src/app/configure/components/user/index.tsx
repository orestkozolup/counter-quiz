"use client";

import { useTranslations } from 'next-intl';

interface UserConfigProps {
  configUser: string | null;
  setConfigUser: (user: string | null) => void;
}

export const UserConfig = ({ configUser, setConfigUser }: UserConfigProps) => {
  const t = useTranslations();
  
  return (
    <div className="w-full max-w-sm mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <p className="text-center text-lg font-medium text-gray-700">
        {t('enter_name')}
      </p>
      <input
        type="text"
        value={configUser ?? ""}
        onChange={(e) => setConfigUser(e.target.value)}
        placeholder="Your name"
        className="w-full px-4 py-3 mt-2 rounded-lg text-gray-800 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
      />
    </div>
  );
};

export default UserConfig;
