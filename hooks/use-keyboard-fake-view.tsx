import { useKeyboardHandler } from 'react-native-keyboard-controller';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useKeyboardFakeView = () => {
  const { bottom } = useSafeAreaInsets();
  const height = useSharedValue(bottom);

  useKeyboardHandler({
    onMove: (e) => {
      'worklet';
      height.value = Math.max(e.height, bottom);
    },
  });

  const fakeViewStyle = useAnimatedStyle(() => ({
    height: Math.abs(height.value),
    marginBottom: height.value > 0 ? 0 : bottom,
  }));

  const fakeView = <Animated.View style={fakeViewStyle} />;
  return { fakeView, height };
};
