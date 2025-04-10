import { Stack } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { KoshOptions } from '~/components/kosh/kosh-options';
import { Avatar } from '~/components/ui/avatar';

const KoshDetailScreen = () => {
  const { bottom } = useSafeAreaInsets();
  return (
    <View style={{ paddingBottom: bottom }}>
      <Stack.Screen options={{ title: 'Kosh Details', headerRight: () => <KoshOptions /> }} />
      <Text>KoshDetailScreen</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator>
        {Array.from({ length: 20 }).map((_, index) => (
          <Avatar
            alt="user"
            fallback="user"
            key={index.toString()}
            className="size-14"
            fallbackClassName="text-3xl font-medium"
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default KoshDetailScreen;
