import { LegendList } from '@legendapp/list';
import { useCallback, useMemo } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChatMessage } from './chat-message';

import { useChat } from '~/providers/chat/hook';

export const ChatArea = () => {
  const { ref, setShowScrollButton, chats } = useChat();
  const { top } = useSafeAreaInsets();
  const ItemSeparator = useCallback(() => <View className="h-3" />, []);
  const containerStyle = useMemo(() => ({ flex: 1 }), []);
  const listStyle = useMemo(() => ({ flex: 1 }), []);
  const contentContainerStyle = useMemo(
    () => ({
      padding: 12,
      paddingTop: top,
    }),
    [top]
  );

  const renderItem = useCallback(
    ({ item }: { item: any }) => <ChatMessage isUser={item.isUser} text={item.text} />,
    []
  );
  const listconfig = useMemo(() => {
    return {
      showsVerticalScrollIndicator: false,
      estimatedItemSize: 82,
      waitForInitialLayout: true,
      maintainVisibleContentPosition: true,
      alignItemsAtEnd: true,
      recycleItems: true,
      maintainScrollAtEnd: true,
      decelerationRate: 'fast',
      automaticallyAdjustContentInsets: true,
      removeClippedSubviews: true,
    };
  }, []);

  const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement, contentInset } = e.nativeEvent;
    const paddingBottom = contentInset?.bottom ?? 0;
    const threshold = 20;

    const isAtBottom =
      contentOffset.y + layoutMeasurement.height + paddingBottom >= contentSize.height - threshold;

    setShowScrollButton(!isAtBottom);
  }, []);
  return (
    <View style={containerStyle}>
      <LegendList
        {...listconfig}
        onScroll={handleScroll}
        data={chats}
        ref={ref}
        keyboardDismissMode="on-drag"
        style={listStyle}
        initialScrollIndex={chats.length - 1}
        keyExtractor={(item) => item.id}
        contentContainerStyle={contentContainerStyle}
        ItemSeparatorComponent={ItemSeparator}
        decelerationRate="fast"
        renderItem={renderItem}
      />
    </View>
  );
};
