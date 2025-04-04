import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useColorScheme } from '~/lib/useColorScheme';

const AuthLayout = () => {
  const { colors } = useColorScheme();
  return (
    <SafeAreaView className="flex-1">
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
          },
        }}>
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="forgot-password"
          options={{
            presentation: 'modal',
            title: 'Forgot Password',
            animation: 'fade_from_bottom',
          }}
        />
        <Stack.Screen
          name="reset-password"
          options={{
            title: 'Reset Password',
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            title: 'Sign up',
          }}
        />
      </Stack>
    </SafeAreaView>
  );
};

export default AuthLayout;
