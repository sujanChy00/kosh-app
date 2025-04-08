import { Link } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DeleteAccountDialog } from '~/components/auth/delete-account-dialog';
import { ArrowRight } from '~/components/icons/arrow-right';
import { KoshCard } from '~/components/kosh/kosh-card';
import { LanguageSelector } from '~/components/language-selector';
import { ProfileCard } from '~/components/profile/profile-card';
import { ProfileLinks } from '~/components/profile/profile-links';
import { ThemeToggle } from '~/components/theme-toggler';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';
import { Spacer } from '~/components/ui/spacer';
import { Text } from '~/components/ui/text';

const ProfileScreen = () => {
  const { top } = useSafeAreaInsets();
  return (
    <ScrollView className="flex-1" style={{ paddingTop: top }}>
      <ProfileCard />
      <View className="gap-y-6 p-4 pt-8">
        <Card className="rounded-2xl border-0 shadow-none">
          {[0, 1, 2, 3, 4].map((_, i) => (
            <KoshCard key={i} />
          ))}
          <Link href="/kosh" asChild>
            <Button variant="secondary" size="flat" className="rounded-b-2xl">
              <Text>View All</Text>
              <ArrowRight size={20} className="text-secondary-foreground" />
            </Button>
          </Link>
        </Card>
        <Card className="rounded-2xl border-0 shadow-none">
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
      <Spacer height={70} />
    </ScrollView>
  );
};

export default ProfileScreen;
