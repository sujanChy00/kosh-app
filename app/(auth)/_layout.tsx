import { Stack } from 'expo-router';

import { useColorScheme } from '~/lib/useColorScheme';

const AuthLayout = () => {
  const { colors } = useColorScheme();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
      }}>
      <Stack.Screen
        name="forgot-password"
        options={{
          presentation: 'modal',
          title: 'Forgot Password',
          animation: 'fade_from_bottom',
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
