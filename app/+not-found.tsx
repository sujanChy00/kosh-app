import { Link, Stack } from 'expo-router';
import LottieView from 'lottie-react-native';
import { View } from 'react-native';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!', headerShown: false }} />
      <View className="flex-1 justify-around p-10">
        <View className="gap-y-10">
          <View className="flex-row justify-center">
            <LottieView
              autoPlay
              style={{
                height: 200,
                width: 200,
              }}
              source={require('~/assets/animated/not-found.json')}
            />
          </View>
          <View>
            <Text className="text-center text-9xl font-extrabold text-secondary">404</Text>
            <Text className="text-center text-xl font-medium text-muted-foreground">
              PAGE NOT FOUND
            </Text>
          </View>
        </View>
        <Link href="/" asChild>
          <Button variant="tonal">
            <Text>Go to home</Text>
          </Button>
        </Link>
      </View>
    </>
  );
}
