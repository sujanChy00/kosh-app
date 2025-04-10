import { LegendListRef } from '@legendapp/list';
import { Stack } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, { ZoomIn, ZoomOut, useAnimatedStyle } from 'react-native-reanimated';

import { ChatAction } from '~/components/chat/chat-action';
import { ChatArea } from '~/components/chat/chat-area';
import { ChevronDown } from '~/components/icons/chevron-down';
import { useKeyboardFakeView } from '~/hooks/use-keyboard-fake-view';

const ChatDetailScreen = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const ref = useRef<LegendListRef>(null);
  const { fakeView, height } = useKeyboardFakeView();

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

  const containerStyle = useMemo(() => ({ flex: 1 }), []);

  const scrollButtonStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    right: 16,
    bottom: height.value > 0 ? height.value + 90 : 90,
    zIndex: 20,
  }));

  return (
    <View style={containerStyle}>
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
            className="size-10 items-center justify-center rounded-2xl bg-secondary shadow">
            <ChevronDown className="text-secondary-foreground" size={30} />
          </TouchableOpacity>
        </Animated.View>
      )}
      <ChatArea setShowScrollButton={setShowScrollButton} chat={chat} ref={ref} />
      <ChatAction onSend={handleSendMessage} />
      {fakeView}
    </View>
  );
};

export default ChatDetailScreen;
