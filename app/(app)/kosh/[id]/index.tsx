import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

import { KoshOptions } from '~/components/kosh/kosh-options';

const KoshDetailScreen = () => {
  return (
    <View>
      <Stack.Screen options={{ title: 'Kosh Details', headerRight: () => <KoshOptions /> }} />
      <Text>KoshDetailScreen</Text>
    </View>
  );
};

export default KoshDetailScreen;
