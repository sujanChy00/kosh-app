import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useColorScheme } from '~/lib/useColorScheme';

const AppLayout = () => {
  const { colors } = useColorScheme();
  return (
    <SafeAreaView className="flex-1">
      <Stack screenOptions={{ headerStyle: { backgroundColor: colors.background } }}>
        <Stack.Screen
          name="update-password"
          options={{
            headerTitle: 'Update Password',
          }}
        />
      </Stack>
    </SafeAreaView>
  );
};

export default AppLayout;
