import { Stack } from 'expo-router';

import { useColorScheme } from '~/hooks/use-color-scheme';

const AppLayout = () => {
  const { colors } = useColorScheme();
  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: colors.background } }}>
      <Stack.Screen
        name="update-password"
        options={{
          headerTitle: 'Update Password',
        }}
      />
      <Stack.Screen name="kosh/[id]/edit" options={{ title: 'Edit Kosh' }} />
      <Stack.Screen name="kosh/[id]/add-manager" options={{ title: 'Add Managers' }} />
      <Stack.Screen name="kosh/[id]/add-member" options={{ title: 'Add Members' }} />
      <Stack.Screen name="kosh/add" options={{ title: 'Add Kosh' }} />
    </Stack>
  );
};

export default AppLayout;
