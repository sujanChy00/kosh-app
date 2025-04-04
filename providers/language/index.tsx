import { useEffect, useState } from 'react';

import { LanguageContext } from './context';
import { dictionary } from './dictionary';
import { DictionaryKey, LanguageKey } from './types';

import { LANGUAGE_KEY } from '~/lib/constants';
import { storage } from '~/lib/storage';

type LanguageProviderProps = {
  defaultLanguage?: LanguageKey;
  children: React.ReactNode;
};

export function LanguageProvider({ children, defaultLanguage }: LanguageProviderProps) {
  const currentLanguage = storage.getString(LANGUAGE_KEY) as LanguageKey;
  const [lang, setLang] = useState<LanguageKey>(defaultLanguage ?? (currentLanguage || 'en'));

  useEffect(() => {
    if (defaultLanguage) {
      setLang(defaultLanguage);
    }
  }, [defaultLanguage]);

  const setLanguage = (key: LanguageKey) => {
    storage.set(LANGUAGE_KEY, key);
    setLang(key);
  };

  const getLanguageKey = (key: DictionaryKey) => {
    if (lang) return dictionary[lang][key];
    return dictionary['en'][key];
  };

  return (
    <LanguageContext.Provider
      value={{
        getText: getLanguageKey,
        language: lang,
        setLanguage,
      }}>
      {children}
    </LanguageContext.Provider>
  );
}
