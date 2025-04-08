import { Link } from 'expo-router';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '~/components/ui/button';

export default function Screen() {
  return (
    <SafeAreaView className="flex-1 p-4">
      <Link href="/login" asChild>
        <Button>
          <Text>Chat</Text>
        </Button>
      </Link>
    </SafeAreaView>
  );
}
