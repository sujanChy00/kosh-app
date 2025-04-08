import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'expo-router';
import { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

import { Avatar } from '../ui/avatar';
import { Text } from '../ui/text';
import { ChatcardActions } from './chat-card-actions';

import { truncateString } from '~/lib/truncate-string';

const ChatCardComponent = () => {
  const router = useRouter();
  return (
    <ReanimatedSwipeable
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      containerStyle={{
        overflow: 'hidden',
      }}
      renderRightActions={ChatcardActions}>
      <TouchableOpacity onPress={() => router.push('/chat/1')}>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-x-3">
            <Avatar
              alt="user"
              fallback="user"
              className="size-14"
              fallbackClassName="text-3xl font-medium"
            />
            <View>
              <Text variant="heading">Sujan Chaudhary</Text>
              <Text className="text-sm text-muted-foreground">
                {truncateString('Hello, how are you?', 30)}
              </Text>
            </View>
          </View>
          <View className="items-end justify-end">
            <View className="size-4 rounded-full bg-primary" />
            <Text variant="caption2" className="italic text-muted-foreground">
              {formatDistanceToNow(new Date(new Date().getTime() - 1000 * 60 * 60 * 24), {
                addSuffix: true,
              })}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </ReanimatedSwipeable>
  );
};

export const ChatCard = memo(ChatCardComponent);
