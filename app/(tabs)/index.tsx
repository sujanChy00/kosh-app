import { Link } from 'expo-router';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { isIos } from '~/lib/constants';

export default function Screen() {
  // const searchValue = useHeaderSearchBar({ hideWhenScrolling: COMPONENTS.length === 0 });

  // const data = searchValue
  //   ? COMPONENTS.filter((c) => c.name.toLowerCase().includes(searchValue.toLowerCase()))
  //   : COMPONENTS;

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        <Input placeholder="Search" />
        <ScrollView>
          {Array.from({ length: 100 }).map((_, index) => (
            <View key={index} className="p-4">
              <Text>{index}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'}>
        <Link href="/login" className="text-foreground" asChild>
          <Button>
            <Text>Login</Text>
          </Button>
        </Link>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
