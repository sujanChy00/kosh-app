import { View } from 'react-native';

import { CameraIcon } from '~/components/icons/camera-icon';
import { GalleryIcon } from '~/components/icons/gallery-icon';
import { SquarePenIcon } from '~/components/icons/square-pen';
import { Avatar } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { useCamera } from '~/hooks/use-camera';
import { useImagePicker } from '~/hooks/use-image-picker';
import { cn } from '~/lib/cn';

interface Props {
  className?: string;
  onImagePicked?: (image?: string | null) => void;
}

export const ProfileImagePicker = ({ className, onImagePicked }: Props) => {
  const { preview, takePhoto } = useCamera({
    onImagePicked,
  });
  const { pickImage, preview: preview2 } = useImagePicker({
    onImagePicked,
  });
  return (
    <View className={cn('items-center gap-y-3', className)}>
      <View className="relative size-36">
        <Avatar
          src={preview || preview2}
          alt="user"
          fallback="user"
          className="text size-full"
          fallbackClassName="text-8xl font-medium"
        />
        <View className="absolute bottom-0 right-0 z-10 size-14 items-center justify-center rounded-full border-4 border-background bg-muted dark:bg-muted-foreground">
          <SquarePenIcon className="text-foreground" />
        </View>
      </View>
      <View className="flex-row items-center justify-between gap-x-6">
        <Button onPress={takePhoto} variant="secondary">
          <CameraIcon className="text-muted-foreground" />
          <Text>Take Photo</Text>
        </Button>
        <Button onPress={pickImage} variant="secondary">
          <GalleryIcon className="text-muted-foreground" />
          <Text>Pick Image</Text>
        </Button>
      </View>
    </View>
  );
};
