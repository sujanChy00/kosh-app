import { View } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';

import { Trash2 } from '~/components/icons/trash-icon2';

export function ChatcardActions(prog: SharedValue<number>, drag: SharedValue<number>) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + 56 }],
    };
  });

  return (
    <Animated.View style={styleAnimation}>
      <View className="size-14 items-center justify-center bg-destructive">
        <Trash2 className="text-destructive-foreground" />
      </View>
    </Animated.View>
  );
}
