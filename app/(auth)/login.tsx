import { FontAwesome } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, Stack } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Pressable, ScrollView, View } from 'react-native';
import { z } from 'zod';

import { Button } from '~/components/ui/button';
import { PasswordInput } from '~/components/ui/form-inputs/password-input';
import { TextInput } from '~/components/ui/form-inputs/text-input';
import { Text } from '~/components/ui/text';
import { TextDivider } from '~/components/ui/text-divider';
import { useColorScheme } from '~/lib/useColorScheme';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  referralCode: z.string().optional(),
});

const Login = () => {
  const lottieRef = useRef<LottieView>(null);
  const { colors } = useColorScheme();

  const form = useForm({
    defaultValues: {
      password: '',
      email: '',
      referralCode: '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = form.handleSubmit(
    (data) => {
      console.log(data);
    },
    () => {
      lottieRef.current?.play();
    }
  );

  return (
    <ScrollView className="flex-1 p-4 pt-0" contentContainerClassName="-translate-y-16 ">
      <Stack.Screen options={{ headerShown: false }} />
      <View>
        <LottieView
          ref={lottieRef}
          autoPlay
          loop={false}
          style={{
            height: 200,
          }}
          source={require('~/assets/animated/hello.json')}
        />
        <Pressable onPress={() => lottieRef.current?.play()}>
          <Text variant="largeTitle" className="-translate-y-1 text-center font-bold italic">
            WELCOME TO KOSH
          </Text>
        </Pressable>
      </View>

      <View className="gap-y-3 pt-20">
        <FormProvider {...form}>
          <TextInput
            control={form.control}
            name="email"
            placeholder="email or phone no."
            label="Email or Phone No."
            className="rounded-full"
            inputMode="email"
            keyboardType="email-address"
          />
          <TextInput
            control={form.control}
            name="referralCode"
            placeholder="referral code"
            label="Referral Code"
            className="rounded-full"
          />
          <View className="gap-y-0.5">
            <PasswordInput
              control={form.control}
              name="password"
              placeholder="***********"
              label="Password"
              className="rounded-full"
            />
            <Link href="/forgot-password" className="text-right text-muted-foreground">
              forgot password ?
            </Link>
          </View>
        </FormProvider>
        <View className="gap-y-3 pt-3">
          <Button variant="secondary" className="rounded-full" onPress={onSubmit}>
            <Text>LOGIN</Text>
          </Button>
        </View>
      </View>
      <View className="flex-row items-center justify-center pt-2">
        <Text className="text-sm text-muted-foreground">Don't have an account ? </Text>
        <Link href="/register">
          <Text className="text-sm font-semibold text-primary underline">Register</Text>
        </Link>
      </View>
      <View className="gap-y-6 pt-4">
        <TextDivider>
          <Text className="font-medium text-muted-foreground">or</Text>
        </TextDivider>
        <View className="gap-y-3">
          <Button className="rounded-full" variant="outline">
            <FontAwesome name="google" size={20} color={colors.foreground} />
            <Text>Login with google</Text>
          </Button>
          <Button variant="outline" className="gap-3 rounded-full ">
            <FontAwesome name="facebook" size={20} color="#1877F2" />
            <Text className="text-[#1877F2]">Login with facebook</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
