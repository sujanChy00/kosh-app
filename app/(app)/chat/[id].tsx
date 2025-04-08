import { LegendList, LegendListRef } from '@legendapp/list';
import { Stack } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, TouchableOpacity, View } from 'react-native';
import { KeyboardAvoidingView, KeyboardGestureArea } from 'react-native-keyboard-controller';
import Animated, { ZoomIn, ZoomOut, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChatInput } from '~/components/chat/chat-input';
import { ChatMessage } from '~/components/chat/chat-message';
import { ChevronDown } from '~/components/icons/chevron-down';
import { isIos } from '~/lib/constants';

const ChatDetailScreen = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const { bottom, top } = useSafeAreaInsets();
  const ref = useRef<LegendListRef>(null);

  const data = useMemo(
    () =>
      Array.from({ length: 50 }).map((_, index) => ({
        id: index.toString(),
        text: 'Hello, my container is blurring contents underneath knkjhkjhjhghfhgf!',
        isUser: index % 2 === 0,
      })),
    []
  );

  const [chat, setChats] = useState(data);

  const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement, contentInset } = e.nativeEvent;
    const paddingBottom = contentInset?.bottom ?? 0;
    const threshold = 20;

    const isAtBottom =
      contentOffset.y + layoutMeasurement.height + paddingBottom >= contentSize.height - threshold;

    setShowScrollButton(!isAtBottom);
  }, []);

  const handleSendMessage = useCallback((message: string) => {
    setChats((prev) => [
      ...prev,
      {
        id: prev.length.toString(),
        text: message,
        isUser: true,
      },
    ]);
    ref.current?.scrollToEnd();
  }, []);

  const handleScrollToEnd = useCallback(() => {
    ref.current?.scrollToEnd();
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: any }) => <ChatMessage isUser={item.isUser} text={item.text} />,
    []
  );

  const ItemSeparator = useCallback(() => <View className="h-3" />, []);

  const containerStyle = useMemo(() => ({ flex: 1 }), []);
  const keyboardAreaStyle = useMemo(
    () => ({
      flex: 1,
      paddingBottom: bottom,
    }),
    [bottom]
  );
  const listStyle = useMemo(() => ({ flex: 1 }), []);
  const contentContainerStyle = useMemo(
    () => ({
      padding: 12,
      paddingTop: top,
    }),
    [top]
  );
  const scrollButtonStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    right: 16,
    bottom: 80,
    zIndex: 20,
  }));

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

  return (
    <View style={containerStyle}>
      <KeyboardGestureArea style={keyboardAreaStyle} interpolator="linear">
        <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} style={containerStyle}>
          <Stack.Screen
            options={{
              headerShown: false,
              headerTransparent: true,
            }}
          />
          {showScrollButton && (
            <Animated.View entering={ZoomIn} exiting={ZoomOut} style={scrollButtonStyle}>
              <TouchableOpacity
                onPress={handleScrollToEnd}
                className="size-12 items-center justify-center rounded-2xl bg-secondary shadow">
                <ChevronDown className="text-secondary-foreground" size={30} />
              </TouchableOpacity>
            </Animated.View>
          )}
          <View style={containerStyle}>
            <LegendList
              {...listconfig}
              onScroll={handleScroll}
              data={chat}
              ref={ref}
              style={listStyle}
              initialScrollIndex={data.length - 1}
              keyExtractor={(item) => item.id}
              contentContainerStyle={contentContainerStyle}
              ItemSeparatorComponent={ItemSeparator}
              decelerationRate="fast"
              renderItem={renderItem}
            />
          </View>
          <ChatInput onSend={handleSendMessage} />
        </KeyboardAvoidingView>
      </KeyboardGestureArea>
    </View>
  );
};

export default ChatDetailScreen;
