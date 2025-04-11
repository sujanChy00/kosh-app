import { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, withSpring } from 'react-native-reanimated';

import { AudioRecordingIndicator } from './audio-recording-indicator';
import { ChatAudioRecorder } from './chat-audio-recorder';

import { PlusIcon } from '~/components/icons/plus-icon';
import { SendHorizonal } from '~/components/icons/send-horizontal';
import { useColorScheme } from '~/hooks/use-color-scheme';
import { cn } from '~/lib/cn';
import { useChat } from '~/providers/chat/hook';

const OPTIONS_HEIGHT = 100;

export const ChatInput = () => {
  const { handleSendMessage, progress, setIsOptionsVisible, isOptionsVisible, recording, sound } =
    useChat();
  const { colors } = useColorScheme();
  const [message, setMessage] = useState('');

  const inputStyle = useAnimatedStyle(() => {
    const translateY = interpolate(progress!.value, [0, 1], [0, -OPTIONS_HEIGHT]);

    return {
      transform: [{ translateY }],
    };
  });

  const plusIconStyle = useAnimatedStyle(() => {
    const rotate = interpolate(progress!.value, [0, 1], [0, 45]);

    return {
      transform: [{ rotate: `${rotate}deg` }],
    };
  });

  const toggleOptions = () => {
    const newValue = isOptionsVisible ? 0 : 1;

    progress!.value = withSpring(newValue, {
      damping: 15,
      stiffness: 100,
      mass: 0.5,
    });

    setIsOptionsVisible(!isOptionsVisible);
  };

  return (
    <Animated.View
      style={[
        {
          zIndex: 1,
          backgroundColor: colors.background,
        },
        inputStyle,
      ]}>
      <View className="flex-row items-center gap-x-2 p-3">
        <TouchableOpacity onPress={toggleOptions}>
          <Animated.View style={plusIconStyle}>
            <PlusIcon className="text-muted-foreground" />
          </Animated.View>
        </TouchableOpacity>

        <View
          className={cn(
            'h-12 flex-1 flex-row items-center rounded-3xl px-3',
            recording ? 'bg-blue-500' : 'bg-card'
          )}>
          {recording ? (
            <AudioRecordingIndicator />
          ) : (
            <TextInput
              placeholder="Type a message"
              value={message}
              multiline
              onChangeText={setMessage}
              className="native:h-full h-full flex-1 py-3.5 text-foreground placeholder:text-muted-foreground"
            />
          )}
          {message.length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                handleSendMessage(message);
                setMessage('');
              }}>
              <SendHorizonal className="text-foreground" />
            </TouchableOpacity>
          ) : (
            <ChatAudioRecorder />
          )}
        </View>
      </View>
    </Animated.View>
  );
};
