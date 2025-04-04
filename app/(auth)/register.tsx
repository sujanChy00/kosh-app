import { FontAwesome } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocalSearchParams } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { z } from 'zod';

import { Button } from '~/components/ui/button';
import { PasswordInput } from '~/components/ui/form-inputs/password-input';
import { TextInput } from '~/components/ui/form-inputs/text-input';
import { Text } from '~/components/ui/text';
import { TextDivider } from '~/components/ui/text-divider';
import { isIos } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';

const schema = z
  .object({
    email: z.string().email().optional(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    userName: z.string().min(1),
    phoneNo: z.coerce.number().min(10),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const Register = () => {
  const { colors } = useColorScheme();
  const params = useLocalSearchParams<{ email?: string }>();
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      email: params?.email || '',
      password: '',
      confirmPassword: '',
      userName: '',
      phoneNo: 0,
    },
    resolver: zodResolver(schema),
  });
  return (
    <KeyboardAvoidingView
      behavior={isIos ? 'padding' : 'height'}
      style={{
        flex: 1,
      }}>
      <ScrollView className="flex-1 p-6">
        <FormProvider {...form}>
          <View className="gap-y-3">
            <TextInput
              control={form.control}
              name="email"
              label="Your email (optional)"
              inputMode="email"
              placeholder="email"
              keyboardType="email-address"
              className="rounded-full"
            />
            <TextInput
              control={form.control}
              name="userName"
              label="Your name"
              placeholder="name"
              className="rounded-full"
            />
            <TextInput
              control={form.control}
              name="phoneNo"
              label="Your phone no."
              placeholder="phone no."
              className="rounded-full"
              keyboardType="phone-pad"
              inputMode="numeric"
            />
            <PasswordInput
              control={form.control}
              name="password"
              label="Password"
              placeholder="***********"
              className="rounded-full"
            />
            <PasswordInput
              control={form.control}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="***********"
              className="rounded-full"
            />
          </View>
          <View className="gap-y-3 pt-6">
            <Button
              variant="secondary"
              className="rounded-full"
              onPress={form.handleSubmit((data) => console.log(data))}>
              <Text>Sign up</Text>
            </Button>
          </View>
        </FormProvider>
        <View className="flex-row items-center justify-center pt-2">
          <Text className="text-sm text-muted-foreground">Don't have an account ? </Text>
          <Link
            href={{
              pathname: '/login',
              params: {
                email: form.watch('email'),
              },
            }}>
            <Text className="text-sm font-semibold text-primary underline">Sign in</Text>
          </Link>
        </View>
        <View className="gap-y-6 pt-4">
          <TextDivider>
            <Text className="font-medium text-muted-foreground">or</Text>
          </TextDivider>
          <View className="gap-y-3">
            <Button className="rounded-full" variant="outline">
              <FontAwesome name="google" size={20} color={colors.foreground} />
              <Text>Sign up with google</Text>
            </Button>
            <Button variant="outline" className="gap-3 rounded-full ">
              <FontAwesome name="facebook" size={20} color="#1877F2" />
              <Text className="text-[#1877F2]">Sign up with facebook</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;
