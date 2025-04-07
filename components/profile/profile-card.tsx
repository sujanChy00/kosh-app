import { Link } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Logout } from '../auth/logout';
import { Avatar } from '../ui/avatar';
import { Text } from '../ui/text';

import { Smartphone } from '~/components/icons/smartphone-icon';

export const ProfileCard = () => {
  return (
    <View className="flex-row items-center justify-between border-b border-b-border p-6">
      <Link href="/profile/1" asChild>
        <Pressable className="flex-1 flex-row items-center gap-x-3">
          <Avatar
            alt="user"
            fallback="user"
            className="size-14"
            fallbackClassName="text-3xl font-medium"
          />
          <View>
            <Text variant="heading">Sujan Chaudhary</Text>
            <View className="flex-row items-center gap-x-1">
              <Smartphone className="text-muted-foreground" size={18} />
              <Text variant="subhead" className="text-muted-foreground">
                98000000000
              </Text>
            </View>
          </View>
        </Pressable>
      </Link>
      <Logout />
    </View>
  );
};
