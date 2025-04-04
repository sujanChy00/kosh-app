import { useContext } from 'react';

import { LanguageContext } from './context';

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  return context;
};
