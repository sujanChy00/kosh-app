import { LegendList, LegendListRef } from '@legendapp/list';
import { formatDistanceToNow } from 'date-fns';
import { Stack } from 'expo-router';
import { useRef, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import { CameraIcon } from '~/components/icons/camera-icon';
import { FolderOpen } from '~/components/icons/folder-open';
import { GalleryIcon } from '~/components/icons/gallery-icon';
import { InfoIcon } from '~/components/icons/info-icon';
import { MicIcon } from '~/components/icons/mic-icon';
import { PhoneIcon } from '~/components/icons/phone-icon';
import { SendHorizonal } from '~/components/icons/send-horizontal';
import { Avatar } from '~/components/ui/avatar';
import { Card } from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { cn } from '~/lib/cn';
import { isIos } from '~/lib/constants';

const ChatDetailScreen = () => {
  const [message, setMessage] = useState('');
  const ref = useRef<LegendListRef>(null);
  const data = Array.from({ length: 50 }).map((_, index) => ({
    id: index.toString(),
    text: 'Hello, my container is blurring contents underneath knkjhkjhjhghfhgf!',
    isUser: index % 2 === 0,
  }));

  const [chat, setChats] = useState(data);

  return (
    <KeyboardAvoidingView
      behavior={isIos ? 'padding' : 'height'}
      keyboardVerticalOffset={170}
      style={{
        flex: 1,
      }}>
      <Stack.Screen
        options={{
          headerTitle: 'Chat Details',
          headerRight: () => (
            <View className="flex-row gap-x-3">
              <TouchableOpacity>
                <PhoneIcon className="text-foreground" />
              </TouchableOpacity>
              <TouchableOpacity>
                <InfoIcon className="text-foreground" />
              </TouchableOpacity>
            </View>
          ),
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
          keyboardDismissMode="on-drag"
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
                    className={cn('text-sm', item.isUser ? 'text-right text-white' : 'text-left')}>
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
      <View className="flex-row items-center gap-x-2 p-3">
        <View className="flex-row items-center gap-x-2">
          <TouchableOpacity>
            <CameraIcon className="text-muted-foreground" />
          </TouchableOpacity>
          <TouchableOpacity>
            <GalleryIcon className="text-muted-foreground" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FolderOpen className="text-muted-foreground" />
          </TouchableOpacity>
        </View>
        <View className="flex-1 flex-row items-center rounded-3xl bg-card px-3">
          <TextInput
            placeholder="your message"
            value={message}
            multiline
            onChangeText={(text) => {
              setMessage(text);
              //  if (text.length > 0) {
              //    expanded.value = withTiming(0, { duration: 400 });
              //  } else {
              //    expanded.value = withTiming(1, { duration: 400 });
              //  }
            }}
            //  autoFocus
            // onFocus={() => {
            //   expanded.value = 1;
            // }}
            className="flex-1 py-3.5 text-foreground placeholder:text-muted-foreground"
          />
          <TouchableOpacity
            onPress={() => {
              setChats((prev) => [
                ...prev,
                {
                  id: prev.length.toString(),
                  text: message,
                  isUser: true,
                },
              ]);
              ref.current?.scrollToEnd();
              setMessage('');
            }}>
            {message.length > 0 ? (
              <SendHorizonal className="text-foreground" />
            ) : (
              <MicIcon className="text-foreground" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatDetailScreen;
