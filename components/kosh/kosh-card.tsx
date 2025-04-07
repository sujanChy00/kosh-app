import { useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

import { Avatar } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { Text } from '../ui/text';

export const KoshCard = () => {
  const router = useRouter();
  return (
    <View>
      <TouchableOpacity className="p-3" onPress={() => router.push('/kosh/3')}>
        <View className="flex-row items-end justify-between">
          <View className="flex-row items-center gap-x-3">
            <Avatar
              alt="user"
              fallback="user"
              className="size-12"
              fallbackClassName="text-3xl font-medium"
            />
            <View>
              <Text>Kosh name</Text>
              <Text className="text-sm text-muted-foreground">kosh description</Text>
            </View>
          </View>
          <Text className="text-sm">view</Text>
        </View>
      </TouchableOpacity>
      <Separator className="bg-background" style={{ height: 1 }} />
    </View>
  );
};
