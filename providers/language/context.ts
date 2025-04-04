import { createContext } from 'react';

import { DictionaryKey, LanguageKey } from './types';

export interface ILanguageContext {
  language?: LanguageKey;
  setLanguage: (language: LanguageKey) => void;
  getText: (key: DictionaryKey) => string;
}

export const LanguageContext = createContext<ILanguageContext>({
  language: undefined,
  setLanguage: () => {},
  getText: () => '',
});
