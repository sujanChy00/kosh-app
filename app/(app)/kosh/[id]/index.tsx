import { Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { KoshOptions } from '~/components/kosh/kosh-options';

const KoshDetailScreen = () => {
  const { bottom } = useSafeAreaInsets();
  return (
    <View style={{ paddingBottom: bottom }}>
      <Stack.Screen options={{ title: 'Kosh Details', headerRight: () => <KoshOptions /> }} />
      <Text>KoshDetailScreen</Text>
    </View>
  );
};

export default KoshDetailScreen;
