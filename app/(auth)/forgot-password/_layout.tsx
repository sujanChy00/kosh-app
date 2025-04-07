import { Stack } from 'expo-router';

import { useColorScheme } from '~/hooks/use-color-scheme';

const Layout = () => {
  const { colors } = useColorScheme();
  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: colors.background } }}>
      <Stack.Screen
        name="reset-password"
        options={{
          title: 'Reset Password',
        }}
      />
      <Stack.Screen
        name="index"
        options={{
          title: 'Forgot Password',
        }}
      />
    </Stack>
  );
};

export default Layout;
