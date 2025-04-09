import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'expo-router';
import { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Avatar } from '../ui/avatar';
import { Swipeable } from '../ui/swipeable';
import { Text } from '../ui/text';
import { ChatcardActions } from './chat-card-actions';

import { truncateString } from '~/lib/truncate-string';

type Props = {
  onDelete: (id: string) => void;
  item: {
    id: string;
    text: string;
  };
};

const ChatCardComponent = ({ item, onDelete }: Props) => {
  const router = useRouter();
  return (
    <Swipeable
      renderRightActions={(props) => (
        <ChatcardActions
          prog={props}
          onDelete={() => {
            onDelete(item.id);
          }}
        />
      )}>
      <TouchableOpacity onPress={() => router.push('/chat/1')}>
        <View className="flex-row items-center justify-between py-3">
          <View className="flex-row items-center gap-x-3">
            <Avatar
              alt="user"
              fallback="user"
              className="size-14"
              src={
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              }
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
            <View className="size-5 items-center justify-center rounded-full bg-destructive">
              <Text className="text-xs text-destructive-foreground">1</Text>
            </View>
            <Text variant="caption2" className="italic text-muted-foreground">
              {formatDistanceToNow(new Date(new Date().getTime() - 1000 * 60 * 60 * 24), {
                addSuffix: true,
              })}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export const ChatCard = memo(ChatCardComponent);
