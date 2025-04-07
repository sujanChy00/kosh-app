import { AntDesign } from '@expo/vector-icons';
import { Alert, TouchableOpacity } from 'react-native';

import { useColorScheme } from '~/hooks/use-color-scheme';

export const Logout = () => {
  const { colors } = useColorScheme();
  return (
    <TouchableOpacity
      onPress={() => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Logout',
            style: 'destructive',
          },
        ]);
      }}>
      <AntDesign name="logout" size={24} color={colors.muted_foreground} />
    </TouchableOpacity>
  );
};
