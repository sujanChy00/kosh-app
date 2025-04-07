import { LegendList } from '@legendapp/list';
import { useState } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated';

import { ChatAnimatedHeader } from '~/components/chat/chat-animated-header';
import { ChatCard } from '~/components/chat/chat-card';
import { Spacer } from '~/components/ui/spacer';

const ChatScreen = () => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const scrollRef = useAnimatedRef<Animated.FlatList<{ id: string; text: string }>>();
  const scrollOffset = useScrollViewOffset(scrollRef as any);

  const text = 'Hello, my container is blurring contents underneath!';
  const data = Array.from({ length: 100 }).map((_, index) => ({
    id: index.toString(),
    text,
  }));

  return (
    <View className="flex-1">
      <ChatAnimatedHeader
        scrollOffset={scrollOffset}
        setHeaderHeight={setHeaderHeight}
        headerHeight={headerHeight}
      />

      <LegendList
        ref={scrollRef as any}
        data={data}
        estimatedItemSize={56}
        ItemSeparatorComponent={() => <View className="h-5" />}
        renderItem={(item) => <ChatCard />}
        keyExtractor={(item) => item.id}
        keyboardDismissMode="on-drag"
        recycleItems
        className="flex-1"
        style={{
          paddingTop: headerHeight,
        }}
        maintainVisibleContentPosition
        // automaticallyAdjustContentInsets
        ListFooterComponent={() => <Spacer height={150} />}
        contentContainerStyle={{
          padding: 16,
          paddingTop: 0,
        }}
      />
    </View>
  );
};

export default ChatScreen;
