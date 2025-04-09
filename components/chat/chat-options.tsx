import { View } from 'react-native';
import Animated, { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

import { Button } from '../ui/button';
import { Text } from '../ui/text';

import { CameraIcon } from '~/components/icons/camera-icon';
import { FolderOpen } from '~/components/icons/folder-open';
import { GalleryIcon } from '~/components/icons/gallery-icon';
import { PhoneIcon } from '~/components/icons/phone-icon';
import { VideoIcon } from '~/components/icons/video-icon';
import { useCamera } from '~/hooks/use-camera';
import { useColorScheme } from '~/hooks/use-color-scheme';
import { useImagePicker } from '~/hooks/use-image-picker';

const OPTIONS_HEIGHT = 100;

export const ChatOptions = ({ progress }: { progress: SharedValue<number> }) => {
  const { colors } = useColorScheme();
  const { pickImage } = useImagePicker();

  const { takePhoto } = useCamera();

  const optionsStyle = useAnimatedStyle(() => {
    const height = interpolate(progress.value, [0, 1], [0, OPTIONS_HEIGHT]);

    // const opacity = interpolate(progress.value, [0, 0.5, 1], [0, 0, 1]);

    return {
      height,
      overflow: 'hidden',
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          backgroundColor: colors.card,
          left: 0,
          right: 0,
          bottom: 0,
          borderTopColor: colors.muted,
          borderTopWidth: 1,
        },
        optionsStyle,
      ]}>
      <View className="flex-row items-center justify-around py-4">
        <View className="items-center gap-y-1">
          <Button size="icon" variant="secondary" onPress={takePhoto}>
            <CameraIcon className="text-muted-foreground" />
          </Button>
          <Text className="text-muted-foreground" variant="caption1">
            camera
          </Text>
        </View>
        <View className="items-center gap-y-1">
          <Button size="icon" variant="secondary" onPress={pickImage}>
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
            <VideoIcon className="text-muted-foreground" />
          </Button>
          <Text className="text-muted-foreground" variant="caption1">
            video
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};
