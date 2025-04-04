import { Linking, Pressable, View } from 'react-native';

import { Logout } from '../auth/logout';
import { Avatar } from '../ui/avatar';
import { Text } from '../ui/text';

import { Smartphone } from '~/components/icons/smartphone-icon';

export const ProfileCard = () => {
  return (
    <View className="flex-row items-center justify-between border-b border-b-border p-6">
      <View className="flex-row items-center gap-x-3">
        <Avatar
          alt="user"
          fallback="user"
          className="size-14"
          fallbackClassName="text-3xl font-medium"
        />
        <View>
          <Text variant="heading">Sujan Chaudhary</Text>
          <Pressable
            className="flex-row items-center gap-x-1"
            onPress={() => {
              Linking.openURL('tel:98000000000');
            }}>
            <Smartphone className="text-muted-foreground" size={18} />
            <Text variant="subhead" className="text-muted-foreground">
              98000000000
            </Text>
          </Pressable>
        </View>
      </View>
      <Logout />
    </View>
  );
};
