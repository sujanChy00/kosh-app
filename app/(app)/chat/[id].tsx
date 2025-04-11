import { Stack } from 'expo-router';
import { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, ZoomIn, ZoomOut } from 'react-native-reanimated';

import { ChatAction } from '~/components/chat/chat-action';
import { ChatArea } from '~/components/chat/chat-area';
import { ChevronDown } from '~/components/icons/chevron-down';
import { useKeyboardFakeView } from '~/hooks/use-keyboard-fake-view';
import { ChatProvider } from '~/providers/chat';
import { useChat } from '~/providers/chat/hook';

const Chat = () => {
  const { fakeView, height } = useKeyboardFakeView();
  const containerStyle = useMemo(() => ({ flex: 1 }), []);
  const { showScrollButton, handleScrollToEnd, isOptionsVisible, OPTIONS_HEIGHT } = useChat();
  const scrollButtonStyle = useAnimatedStyle(() => {
    const bottomWithOptions = height.value + 90 + OPTIONS_HEIGHT;
    return {
      position: 'absolute',
      right: 16,
      bottom: isOptionsVisible ? bottomWithOptions : height.value + 90,
      zIndex: 20,
    };
  });

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
      <ChatArea />
      <ChatAction />
      {fakeView}
    </View>
  );
};

const Page = () => {
  return (
    <ChatProvider>
      <Chat />
    </ChatProvider>
  );
};

export default Page;
