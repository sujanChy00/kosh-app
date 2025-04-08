import { LegendList, LegendListRef } from '@legendapp/list';
import { formatDistanceToNow } from 'date-fns';
import { Stack } from 'expo-router';
import { useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  KeyboardAvoidingView,
  KeyboardGestureArea,
  useKeyboardHandler,
} from 'react-native-keyboard-controller';
import Animated, { ZoomIn, ZoomOut, runOnJS } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChatInput } from '~/components/chat/chat-input';
import { ChevronDown } from '~/components/icons/chevron-down';
import { Avatar } from '~/components/ui/avatar';
import { Card } from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { cn } from '~/lib/cn';
import { isIos } from '~/lib/constants';

const ChatDetailScreen = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const { bottom, top } = useSafeAreaInsets();
  const ref = useRef<LegendListRef>(null);

  useKeyboardHandler({
    onMove: (e) => {
      'worklet';
      runOnJS(setKeyboardVisible)(e.height > 0);
    },
    onEnd: (e) => {
      'worklet';
      runOnJS(setKeyboardVisible)(e.height > 0);
    },
  });

  const data = Array.from({ length: 50 }).map((_, index) => ({
    id: index.toString(),
    text: 'Hello, my container is blurring contents underneath knkjhkjhjhghfhgf!',
    isUser: index % 2 === 0,
  }));

  const [chat, setChats] = useState(data);

  return (
    <View style={styles.container}>
      <KeyboardGestureArea style={styles.gestureArea} interpolator="linear">
        <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} style={styles.keyboardView}>
          <Stack.Screen
            options={{
              headerShown: false,
              headerTransparent: true,
            }}
          />
          {showScrollButton && (
            <Animated.View entering={ZoomIn} exiting={ZoomOut} style={styles.scrollButton}>
              <TouchableOpacity
                onPress={() => ref.current?.scrollToEnd()}
                className="size-12 items-center justify-center rounded-2xl bg-secondary shadow">
                <ChevronDown className="text-secondary-foreground" size={30} />
              </TouchableOpacity>
            </Animated.View>
          )}
          <View style={styles.listContainer}>
            <LegendList
              onScroll={(e) => {
                const { contentOffset, contentSize, layoutMeasurement, contentInset } =
                  e.nativeEvent;
                const paddingBottom = contentInset?.bottom ?? 0;
                const threshold = 20;

                const isAtBottom =
                  contentOffset.y + layoutMeasurement.height + paddingBottom >=
                  contentSize.height - threshold;

                setShowScrollButton(!isAtBottom);
              }}
              data={chat}
              showsVerticalScrollIndicator={false}
              ref={ref}
              style={styles.list}
              initialScrollIndex={data.length - 1}
              estimatedItemSize={41}
              keyExtractor={(item) => item.id}
              maintainVisibleContentPosition
              alignItemsAtEnd
              contentContainerStyle={{
                padding: 12,
                paddingTop: top,
              }}
              recycleItems
              maintainScrollAtEnd
              scrollEventThrottle={16}
              ItemSeparatorComponent={() => <View className="h-3" />}
              renderItem={({ item }) => (
                <View
                  className={cn(
                    'items-center gap-x-2',
                    item.isUser ? 'ml-auto flex-row-reverse' : 'mr-auto flex-row'
                  )}>
                  <Avatar alt="user" fallback="user" />
                  <View className="max-w-[85%]">
                    <Card
                      className={cn('gap-y-0.5 rounded-3xl border-0 p-2 shadow-none', {
                        'bg-primary': item.isUser,
                        'bg-card': !item.isUser,
                      })}>
                      <Text
                        className={cn(
                          'text-sm',
                          item.isUser ? 'text-right text-white' : 'text-left'
                        )}>
                        {item.text}
                      </Text>
                    </Card>
                    <Text
                      variant="caption2"
                      className={cn(
                        'italic ',
                        item.isUser ? 'text-right text-muted' : 'text-left text-muted-foreground'
                      )}>
                      {formatDistanceToNow(new Date(new Date().getTime() - 1000 * 60 * 60 * 24), {
                        addSuffix: true,
                      })}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
          <ChatInput
            onSend={(message: string) => {
              setChats((prev) => [
                ...prev,
                {
                  id: prev.length.toString(),
                  text: message,
                  isUser: true,
                },
              ]);
              ref.current?.scrollToEnd();
            }}
          />
        </KeyboardAvoidingView>
      </KeyboardGestureArea>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gestureArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollButton: {
    position: 'absolute',
    right: 16,
    bottom: 80,
    zIndex: 20,
  },
  listContainer: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});

export default ChatDetailScreen;
