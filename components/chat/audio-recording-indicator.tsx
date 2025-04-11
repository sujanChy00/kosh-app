import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { Text } from '../ui/text';

import { cn } from '~/lib/cn';
import { useChat } from '~/providers/chat/hook';

export const AudioRecordingIndicator = ({ className }: { className?: string }) => {
  const pulseAnim = useSharedValue(1);
  const { formatedRecordingTime } = useChat();

  useEffect(() => {
    pulseAnim.value = withRepeat(
      withSequence(withTiming(1.2, { duration: 500 }), withTiming(1, { duration: 500 })),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseAnim.value }],
    opacity: pulseAnim.value,
  }));

  return (
    <View
      className={cn(
        'h-full flex-1 flex-row items-center justify-between overflow-x-hidden rounded-full bg-blue-500 py-3.5 pr-2',
        className
      )}>
      <View className="flex-1 flex-row items-center gap-x-1">
        <Animated.View
          className="mr-2 mt-1 h-3 w-3 rounded-full bg-red-500"
          style={animatedStyle}
        />
        <Text className="flex-1 text-sm text-white">recording...</Text>
      </View>
      <Text className="text-sm text-white">{formatedRecordingTime()}</Text>
    </View>
  );
};
