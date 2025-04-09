import { LegendList, LegendListRef } from '@legendapp/list';
import React, { useCallback, useMemo } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChatMessage } from './chat-message';

type Props = {
  chat: {
    id: string;
    text: string;
    isUser: boolean;
  }[];
  setShowScrollButton: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ChatArea = React.forwardRef<LegendListRef, Props>(
  ({ chat, setShowScrollButton }, ref) => {
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
        contentOffset.y + layoutMeasurement.height + paddingBottom >=
        contentSize.height - threshold;

      setShowScrollButton(!isAtBottom);
    }, []);
    return (
      <View style={containerStyle}>
        <LegendList
          {...listconfig}
          onScroll={handleScroll}
          data={chat}
          ref={ref}
          style={listStyle}
          initialScrollIndex={chat.length - 1}
          keyExtractor={(item) => item.id}
          contentContainerStyle={contentContainerStyle}
          ItemSeparatorComponent={ItemSeparator}
          decelerationRate="fast"
          renderItem={renderItem}
        />
      </View>
    );
  }
);
