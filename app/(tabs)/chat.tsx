import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { LegendList } from '@legendapp/list';
import Animated, {
  LinearTransition,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChatAnimatedHeader } from '~/components/chat/chat-animated-header';
import { ChatCard } from '~/components/chat/chat-card';
import { SquarePenIcon } from '~/components/icons/square-pen';
import { Spacer } from '~/components/ui/spacer';
import { Text } from '~/components/ui/text';
import { Avatar } from '~/components/ui/avatar';
import { OnLineUsersList } from '~/components/chat/online-users-list';

type ChatItem = {
  id: string;
  text: string;
};

const ChatScreen = () => {
  const { push } = useRouter();
  const { top } = useSafeAreaInsets();
  const scrollRef = useAnimatedRef<Animated.FlatList<ChatItem>>();
  const scrollOffset = useScrollViewOffset(scrollRef as any);
  const [chats, setChats] = useState<ChatItem[]>(
    Array.from({ length: 100 }).map((_, index) => ({
      id: index.toString(),
      text,
    }))
  );

  const paddintTop = useSharedValue(140);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      paddingTop: withTiming(paddintTop.value + top),
    };
  });

  const text = 'Hello, my container is blurring contents underneath!';
  const data = useMemo(() => chats, [chats]);

  const renderItem = useCallback(
    ({ item }: { item: ChatItem }) => (
      <ChatCard
        item={item}
        onDelete={(id) => {
          setChats((prev) => prev.filter((chat) => chat.id !== id));
        }}
      />
    ),
    []
  );

  const keyExtractor = useCallback((item: ChatItem) => item.id, []);

  const ListEmptyComponent = useCallback(() => <Text>sticky header</Text>, []);

  const ListFooterComponent = useCallback(() => <Spacer height={200} />, []);

  return (
    <View className="flex-1">
      <TouchableOpacity
        onPress={() => push('/create-group')}
        className="absolute bottom-5 right-4 z-20 size-14 items-center justify-center rounded-2xl bg-secondary shadow">
        <SquarePenIcon className="text-secondary-foreground" />
      </TouchableOpacity>
      <ChatAnimatedHeader scrollOffset={scrollOffset} paddingTop={paddintTop} />
      <Animated.FlatList
        removeClippedSubviews
        ListHeaderComponent={<OnLineUsersList />}
        maxToRenderPerBatch={20}
        initialNumToRender={20}
        ListEmptyComponent={ListEmptyComponent}
        ref={scrollRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        keyboardDismissMode="on-drag"
        itemLayoutAnimation={LinearTransition}
        style={[
          {
            flex: 1,
            padding: 16,
          },
          animatedStyle,
        ]}
        ListFooterComponent={ListFooterComponent}
      />
    </View>
  );
};

export default ChatScreen;
