import { formatDistanceToNow } from 'date-fns';
import { Link } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

import { Avatar } from '../ui/avatar';
import { Text } from '../ui/text';

import { truncateString } from '~/lib/truncate-string';

export const ChatCard = () => {
  return (
    <Link asChild href="/chat/1">
      <TouchableOpacity>
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
    </Link>
  );
};
