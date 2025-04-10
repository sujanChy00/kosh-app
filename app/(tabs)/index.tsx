import { Link } from 'expo-router';
import { View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { isIos } from '~/lib/constants';

export default function Screen() {
  return (
    <KeyboardAvoidingView
      behavior={isIos ? 'padding' : 'height'}
      style={{
        flex: 1,
      }}>
      <SafeAreaView className="flex-1">
        <View className="flex-1 bg-red-500"></View>
        <Input placeholder="helo" />
      </SafeAreaView>
    </KeyboardAvoidingView>
    // <SafeAreaView className="flex-1 p-4">
    //   <Link href="/login" asChild>
    //     <Button>
    //       <Text>Chat</Text>
    //     </Button>
    //   </Link>
    // </SafeAreaView>
  );
}
