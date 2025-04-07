import { useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

import { BadgeInfo } from '../icons/badge-info';
import { ChevronRight } from '../icons/chevron-right';
import { Handshake } from '../icons/handshake-icon';
import { Lock } from '../icons/lock-icon';
import { ShieldCheck } from '../icons/shield-check';
import { UserRoundPenIcon } from '../icons/user-round-pen';
import { Wrench } from '../icons/wrench-icon';
import { Separator } from '../ui/separator';
import { Text } from '../ui/text';

const links = [
  {
    label: 'Update Password',
    href: '/update-password',
    icon: <Lock size={24} className="text-muted-foreground" />,
  },
  {
    label: 'Update Profile',
    href: '/profile/1/edit',
    icon: <UserRoundPenIcon size={24} className="text-muted-foreground" />,
  },
  {
    label: 'Privacy Policy',
    href: '/privacy-policy',
    icon: <ShieldCheck size={24} className="text-muted-foreground" />,
  },
  {
    label: 'Terms of Service',
    href: '/terms',
    icon: <Handshake size={24} className="text-muted-foreground" />,
  },
  {
    label: 'About',
    href: '/about',
    icon: <BadgeInfo size={24} className="text-muted-foreground" />,
  },
  {
    label: 'Developer',
    href: '/developer',
    icon: <Wrench size={24} className="text-muted-foreground" />,
  },
];

export const ProfileLinks = () => {
  const router = useRouter();
  return links.map((link, index) => (
    <View key={link.href + index}>
      <TouchableOpacity className="p-4" onPress={() => router.push(link.href)}>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-x-2">
            {link.icon}
            <Text className="font-medium">{link.label}</Text>
          </View>
          <ChevronRight size={22} className="text-muted-foreground" />
        </View>
      </TouchableOpacity>
      <Separator
        className="bg-background"
        style={{
          height: 1,
        }}
      />
    </View>
  ));
};
