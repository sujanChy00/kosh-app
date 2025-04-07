import * as NavigationBar from 'expo-navigation-bar';
import { useColorScheme as useNativewindColorScheme } from 'nativewind';
import * as React from 'react';
import { Platform } from 'react-native';

import { THEME_KEY } from '../lib/constants';
import { storage } from '../lib/storage';

import { COLORS, THEME } from '~/theme/colors';

function useColorScheme() {
  const { colorScheme, setColorScheme: setNativeWindColorScheme } = useNativewindColorScheme();

  async function setColorScheme(colorScheme: THEME) {
    storage.set(THEME_KEY, colorScheme);
    setNativeWindColorScheme(colorScheme);
    if (Platform.OS !== 'android') return;
    try {
      await setNavigationBar(colorScheme);
    } catch (error) {
      console.error('useColorScheme.tsx", "setColorScheme', error);
    }
  }

  function toggleColorScheme() {
    return setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
  }

  return {
    colorScheme: colorScheme ?? 'light',
    isDarkColorScheme: colorScheme === 'dark',
    setColorScheme,
    toggleColorScheme,
    colors: COLORS[colorScheme ?? 'light'],
  };
}

function useInitialAndroidBarSync() {
  const { colorScheme } = useColorScheme();

  React.useEffect(() => {
    if (Platform.OS !== 'android') return;
    setNavigationBar(colorScheme).catch((error) => {
      console.error('useColorScheme.tsx", "useInitialColorScheme', error);
    });
  }, [colorScheme]);
}

export { useColorScheme, useInitialAndroidBarSync };

function setNavigationBar(colorScheme: THEME) {
  return Promise.all([
    NavigationBar.setButtonStyleAsync(colorScheme === 'dark' ? 'light' : 'dark'),
    NavigationBar.setPositionAsync('absolute'),
    NavigationBar.setBackgroundColorAsync(colorScheme === 'dark' ? '#00000030' : '#ffffff80'),
  ]);
}
