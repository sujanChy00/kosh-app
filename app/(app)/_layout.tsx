import { Stack } from 'expo-router';

import { useColorScheme } from '~/lib/useColorScheme';

const AppLayout = () => {
  const { colors } = useColorScheme();
  return <Stack screenOptions={{ headerStyle: { backgroundColor: colors.background } }} />;
};

export default AppLayout;
