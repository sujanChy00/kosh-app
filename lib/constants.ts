import { Platform } from 'react-native';

export const LANGUAGE_KEY = 'language';
export const THEME_KEY = 'colorScheme';

export const isAndroid = Platform.OS === 'android';

export const isWeb = Platform.OS === 'web';
export const isIos = Platform.OS === 'ios';
export const isNative = isAndroid || isIos;
