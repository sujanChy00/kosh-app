import { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import { MicIcon } from '~/components/icons/mic-icon';
import { PlusIcon } from '~/components/icons/plus-icon';
import { SendHorizonal } from '~/components/icons/send-horizontal';
import { useColorScheme } from '~/hooks/use-color-scheme';

const OPTIONS_HEIGHT = 100;

type Props = {
  onSend: (message: string) => void;
  progress: SharedValue<number>;
};

export const ChatInput = ({ onSend, progress }: Props) => {
  const { colors } = useColorScheme();
  const [message, setMessage] = useState('');
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const inputStyle = useAnimatedStyle(() => {
    const translateY = interpolate(progress.value, [0, 1], [0, -OPTIONS_HEIGHT]);

    return {
      transform: [{ translateY }],
    };
  });

  const plusIconStyle = useAnimatedStyle(() => {
    const rotate = interpolate(progress.value, [0, 1], [0, 45]);

    return {
      transform: [{ rotate: `${rotate}deg` }],
    };
  });

  const toggleOptions = () => {
    const newValue = isOptionsVisible ? 0 : 1;

    progress.value = withSpring(newValue, {
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

        <View className="flex-1 flex-row items-center rounded-3xl bg-card px-3">
          <TextInput
            placeholder="Type a message"
            value={message}
            multiline
            onChangeText={setMessage}
            className="flex-1 py-3.5 text-foreground placeholder:text-muted-foreground"
          />
          <TouchableOpacity
            onPress={() => {
              onSend(message);
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
    </Animated.View>
  );
};
