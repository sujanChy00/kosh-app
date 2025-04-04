import { Link } from 'expo-router';
import { View } from 'react-native';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function Screen() {
  return (
    <View className="flex-1">
      <Link href="/login" asChild>
        <Button>
          <Text className="text-foreground">done</Text>
        </Button>
      </Link>
    </View>
  );
}
