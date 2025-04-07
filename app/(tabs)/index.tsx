import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function Screen() {
  return (
    <SafeAreaView className="flex-1">
      <Link href="/login" asChild>
        <Button>
          <Text className="text-foreground">done</Text>
        </Button>
      </Link>
    </SafeAreaView>
  );
}
