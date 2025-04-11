import { Audio } from 'expo-av';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { LayoutAnimationConfig, ZoomIn } from 'react-native-reanimated';

import { Text } from '../ui/text';

import { X } from '~/components/icons/close-icon';
import { PauseIcon } from '~/components/icons/pause-icon';
import { PlayIcon } from '~/components/icons/play-icon';
import { useChat } from '~/providers/chat/hook';

export const ChatAudioPreview = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { sound, formatedElapsedTime, setSound, setRecording } = useChat();

  const onPlay = async () => {
    setIsPlaying(true);
    await Audio.Sound.createAsync({ uri: sound! }, { shouldPlay: true });
  };
  const onPause = async () => {
    setIsPlaying(false);
    await Audio.Sound.createAsync({ uri: sound! }, { shouldPlay: false });
  };

  return (
    <View className="h-full flex-1 flex-row items-center justify-between rounded-full bg-blue-500 py-3.5 pr-3">
      <View className="flex-row items-center gap-x-2">
        <Pressable
          onPress={() => {
            setSound(null);
            setRecording(undefined);
          }}>
          <X size={22} className="text-destructive" />
        </Pressable>
        <Text className="text-sm text-muted">{formatedElapsedTime()}</Text>
      </View>
      <View className="h-[1px] flex-1 bg-muted" />
      <View className="size-8 items-center justify-center rounded-full bg-muted">
        <LayoutAnimationConfig skipEntering>
          <Animated.View entering={ZoomIn} key={isPlaying ? 'playing' : 'not'}>
            <Pressable onPress={isPlaying ? onPause : onPlay}>
              {isPlaying ? (
                <PauseIcon className="text-blue-500" size={20} />
              ) : (
                <PlayIcon className="text-blue-500" size={20} />
              )}
            </Pressable>
          </Animated.View>
        </LayoutAnimationConfig>
      </View>
    </View>
  );
};
