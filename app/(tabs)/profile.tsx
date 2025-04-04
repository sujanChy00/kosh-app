import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DeleteAccountDialog } from '~/components/auth/delete-account-dialog';
import { LanguageSelector } from '~/components/language-selector';
import { ProfileCard } from '~/components/profile/profile-card';
import { ProfileLinks } from '~/components/profile/profile-links';
import { ThemeToggle } from '~/components/theme-toggler';
import { Card } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';

const ProfileScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1">
        <ProfileCard />
        <View className="p-4">
          <Card className="border-0 shadow-none">
            <ProfileLinks />
            <ThemeToggle />
            <Separator
              className="bg-background"
              style={{
                height: 1,
              }}
            />
            <LanguageSelector />
            <Separator
              className="bg-background"
              style={{
                height: 1,
              }}
            />
            <DeleteAccountDialog />
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
