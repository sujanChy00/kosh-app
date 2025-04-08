import { LegendList, LegendListRef } from '@legendapp/list';
import { formatDistanceToNow } from 'date-fns';
import { Stack } from 'expo-router';
import { useRef, useState } from 'react';
import { View } from 'react-native';
import { KeyboardAvoidingView, KeyboardGestureArea } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChatInput } from '~/components/chat/chat-input';
import { Avatar } from '~/components/ui/avatar';
import { Card } from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { cn } from '~/lib/cn';
import { isIos } from '~/lib/constants';

const ChatDetailScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const ref = useRef<LegendListRef>(null);
  const data = Array.from({ length: 50 }).map((_, index) => ({
    id: index.toString(),
    text: 'Hello, my container is blurring contents underneath knkjhkjhjhghfhgf!',
    isUser: index % 2 === 0,
  }));

  const [chat, setChats] = useState(data);

  return (
    <KeyboardGestureArea style={{ flex: 1, paddingBottom: bottom }} interpolator="linear">
      <KeyboardAvoidingView
        behavior={isIos ? 'padding' : 'height'}
        style={{
          flex: 1,
        }}>
        <Stack.Screen
          options={{
            headerShown: false,
            headerTransparent: true,
          }}
        />
        <View className="flex-1">
          <LegendList
            data={chat}
            className="flex-1"
            onStartReached={() => {
              console.log('start reached');
            }}
            ref={ref}
            initialScrollIndex={data.length - 1}
            estimatedItemSize={41}
            keyExtractor={(item) => item.id}
            maintainVisibleContentPosition
            alignItemsAtEnd
            contentContainerStyle={{
              padding: 12,
            }}
            recycleItems
            maintainScrollAtEnd
            scrollEventThrottle={16}
            ItemSeparatorComponent={() => <View className="h-3" />}
            maintainScrollAtEndThreshold={0.1}
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
  );
};

export default ChatDetailScreen;
