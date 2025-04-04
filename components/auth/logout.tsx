import { Alert, TouchableOpacity } from 'react-native';

import { LogoutIcon } from '~/components/icons/logout-icon';

export const Logout = () => {
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
      <LogoutIcon className="text-destructive" />
    </TouchableOpacity>
  );
};
