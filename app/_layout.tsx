import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { Icon } from '@roninoss/icons';
import 'expo-dev-client';
import { useFonts } from 'expo-font';
import { Link, SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import '../global.css';

import { ThemeToggle } from '~/components/theme-toggler';
import { useColorScheme, useInitialAndroidBarSync } from '~/hooks/use-color-scheme';
import { cn } from '~/lib/cn';
import { THEME_KEY } from '~/lib/constants';
import { storage } from '~/lib/storage';
import { LanguageProvider } from '~/providers/language';
import { NAV_THEME } from '~/theme';
import { THEME } from '~/theme/colors';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme, setColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setColorSchemeLoaded] = useState(false);
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    (() => {
      const storedColorScheme = storage.getString(THEME_KEY);
      if (storedColorScheme) {
        setColorSchemeLoaded(true);
        setColorScheme(storedColorScheme as THEME);
      } else {
        storage.set(THEME_KEY, 'light');
        setColorSchemeLoaded(true);
        setColorScheme('light');
      }
    })();
  }, []);

  useEffect(() => {
    if (loaded && isColorSchemeLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isColorSchemeLoaded]);

  if (!loaded || !isColorSchemeLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar
        key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
        style={isDarkColorScheme ? 'light' : 'dark'}
      />
      {/* WRAP YOUR APP WITH ANY ADDITIONAL PROVIDERS HERE */}
      {/* <ExampleProvider> */}

      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <KeyboardProvider navigationBarTranslucent>
            <ActionSheetProvider>
              <NavThemeProvider value={NAV_THEME[colorScheme]}>
                <LanguageProvider>
                  <Stack screenOptions={SCREEN_OPTIONS}>
                    <Stack.Screen
                      name="(tabs)"
                      options={{
                        headerShown: false,
                      }}
                    />
                    <Stack.Screen
                      name="(auth)"
                      options={{
                        headerShown: false,
                      }}
                    />
                    <Stack.Screen
                      name="(app)"
                      options={{
                        headerShown: false,
                      }}
                    />
                  </Stack>
                </LanguageProvider>
              </NavThemeProvider>
            </ActionSheetProvider>
          </KeyboardProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>

      {/* </ExampleProvider> */}
    </>
  );
}

const SCREEN_OPTIONS = {
  animation: 'ios_from_right', // for android
} as const;

const INDEX_OPTIONS = {
  headerLargeTitle: true,
  title: 'NativeWindUI',
  headerRight: () => <SettingsIcon />,
} as const;

function SettingsIcon() {
  const { colors } = useColorScheme();
  return (
    <Link href="/modal" asChild>
      <Pressable className="opacity-80">
        {({ pressed }) => (
          <View className={cn(pressed ? 'opacity-50' : 'opacity-90')}>
            <Icon name="cog-outline" color={colors.foreground} />
          </View>
        )}
      </Pressable>
    </Link>
  );
}

const MODAL_OPTIONS = {
  presentation: 'modal',
  animation: 'fade_from_bottom', // for android
  title: 'Settings',
  headerRight: () => <ThemeToggle />,
} as const;
