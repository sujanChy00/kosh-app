import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert, Linking } from 'react-native';

type Props = ImagePicker.ImagePickerOptions & {
  onImagePicked?: (image?: string | null) => void;
};

export const useCamera = ({ onImagePicked, ...props }: Props = {}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const takePhoto = async () => {
    if (!status?.granted) {
      const { status } = await requestPermission();
      if (status !== ImagePicker.PermissionStatus.GRANTED) {
        Alert.alert(
          'Camera Permission Required',
          'Please enable camera access in your device settings to take photos.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Open Settings',
              onPress: () => Linking.openSettings(),
            },
          ]
        );
        return;
      }
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
      ...props,
    });

    if (!result.canceled) {
      setPreview(result.assets[0].uri);

      const base64 = result.assets[0].base64;
      onImagePicked?.(base64);
    }
  };

  return { preview, takePhoto };
};
