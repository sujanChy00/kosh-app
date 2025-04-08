import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Button } from '../ui/button';
import { Text } from '../ui/text';

import { CameraIcon } from '~/components/icons/camera-icon';
import { FolderOpen } from '~/components/icons/folder-open';
import { GalleryIcon } from '~/components/icons/gallery-icon';
import { InfoIcon } from '~/components/icons/info-icon';
import { MicIcon } from '~/components/icons/mic-icon';
import { PhoneIcon } from '~/components/icons/phone-icon';
import { PlusIcon } from '~/components/icons/plus-icon';
import { SendHorizonal } from '~/components/icons/send-horizontal';
import { useColorScheme } from '~/hooks/use-color-scheme';

const OPTIONS_HEIGHT = 100;

export const ChatInput = ({ onSend }: { onSend: (message: string) => void }) => {
  const { colors } = useColorScheme();
  const [message, setMessage] = useState('');
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const progress = useSharedValue(0);

  const optionsStyle = useAnimatedStyle(() => {
    const height = interpolate(progress.value, [0, 1], [0, OPTIONS_HEIGHT]);

    // const opacity = interpolate(progress.value, [0, 0.5, 1], [0, 0, 1]);

    return {
      height,
      overflow: 'hidden',
    };
  });

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
    <View>
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

      <Animated.View
        style={[
          {
            position: 'absolute',
            backgroundColor: colors.card,
            left: 0,
            right: 0,
            bottom: 0,
          },
          optionsStyle,
        ]}>
        <View className="flex-row items-center justify-around py-4">
          <View className="items-center gap-y-1">
            <Button size="icon" variant="secondary">
              <CameraIcon className="text-muted-foreground" />
            </Button>
            <Text className="text-muted-foreground" variant="caption1">
              camera
            </Text>
          </View>
          <View className="items-center gap-y-1">
            <Button size="icon" variant="secondary">
              <GalleryIcon className="text-muted-foreground" />
            </Button>
            <Text className="text-muted-foreground" variant="caption1">
              gallery
            </Text>
          </View>
          <View className="items-center gap-y-1">
            <Button size="icon" variant="secondary">
              <FolderOpen className="text-muted-foreground" />
            </Button>
            <Text className="text-muted-foreground" variant="caption1">
              files
            </Text>
          </View>
          <View className="items-center gap-y-1">
            <Button size="icon" variant="secondary">
              <PhoneIcon className="text-muted-foreground" />
            </Button>
            <Text className="text-muted-foreground" variant="caption1">
              call
            </Text>
          </View>
          <View className="items-center gap-y-1">
            <Button size="icon" variant="secondary">
              <InfoIcon className="text-muted-foreground" />
            </Button>
            <Text className="text-muted-foreground" variant="caption1">
              info
            </Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  plusButton: {
    padding: 4,
  },
});
