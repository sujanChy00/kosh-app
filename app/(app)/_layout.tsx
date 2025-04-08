import { Stack } from 'expo-router';

import { useColorScheme } from '~/hooks/use-color-scheme';

const AppLayout = () => {
  const { colors } = useColorScheme();
  return <Stack screenOptions={{ headerStyle: { backgroundColor: colors.background } }} />;
};

export default AppLayout;
