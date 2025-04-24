'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function getCookie(name: string): string | null {
  const cookies = Object.fromEntries(
    document.cookie.split('; ').map(cookie => {
      const [key, value] = cookie.split('=');
      return [key, value];
    })
  );
  return cookies[name] ?? null;
}

export default function LanguageSwitcher() {
  const [currentLocale, setCurrentLocale] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setCurrentLocale(getCookie('locale'));
  }, []);

  const switchLanguage = (locale: string) => {
    document.cookie = `locale=${locale}; path=/`;
    setCurrentLocale(locale);
    router.refresh();
  };

  const getButtonStyle = (locale: string) =>
    `text-sm font-medium rounded-full px-2 py-1 min-w-[70px] transition text-center ${
      currentLocale === locale
        ? 'bg-indigo-500 text-white'
        : 'text-gray-700 hover:text-indigo-600'
    }`;

  return (
    <div className="fixed top-4 right-4 z-50 flex space-x-3 bg-white rounded-full shadow-lg px-2 py-1">
      <button onClick={() => switchLanguage('en')} className={getButtonStyle('en')}>
        🇬🇧 EN
      </button>
      <button onClick={() => switchLanguage('ua')} className={getButtonStyle('ua')}>
        🇺🇦 УК
      </button>
    </div>
  );
}
