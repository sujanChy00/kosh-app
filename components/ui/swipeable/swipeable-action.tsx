import { Animated, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { useSwipeable } from '.';

import { cn } from '~/lib/cn';

interface Props extends Omit<TouchableOpacityProps, 'onPress'> {
  progress: Animated.AnimatedInterpolation<number>;
  width: number;
  onPress?: () => void;
}
export const SwipeableAction = ({ progress, width, children, ...props }: Props) => {
  const trans = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [width, 0],
  });
  const { onClose } = useSwipeable();
  return (
    <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
      <TouchableOpacity
        {...props}
        className={cn('flex-1 items-center justify-center', props.className)}
        onPress={() => {
          props.onPress?.();
          onClose();
        }}>
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};
