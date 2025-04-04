import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocalSearchParams } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { z } from 'zod';

import { Button } from '~/components/ui/button';
import { PasswordInput } from '~/components/ui/form-inputs/password-input';
import { TextInput } from '~/components/ui/form-inputs/text-input';
import { Text } from '~/components/ui/text';
import { isIos } from '~/lib/constants';

const schema = z
  .object({
    email: z.string().email(),
    token: z.string().min(6),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const ResetPassword = () => {
  const params = useLocalSearchParams<{ email?: string; token?: string }>();
  const form = useForm({
    defaultValues: {
      email: params?.email || '',
      token: params?.token || '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(schema),
  });
  return (
    <KeyboardAvoidingView
      className="p-4"
      keyboardVerticalOffset={90}
      behavior={isIos ? 'padding' : 'height'}
      style={{
        flex: 1,
      }}>
      <ScrollView className="flex-1">
        <View className="flex-1 justify-center gap-y-3">
          <FormProvider {...form}>
            <TextInput
              control={form.control}
              name="email"
              placeholder="so***@gmail.com"
              className="rounded-full"
              inputMode="email"
              keyboardType="email-address"
              label="Your email"
            />
            <TextInput
              control={form.control}
              name="token"
              placeholder="token"
              className="rounded-full"
              label="Token"
            />
            <PasswordInput
              control={form.control}
              name="password"
              placeholder="***********"
              label="Password"
              className="rounded-full"
            />
            <PasswordInput
              control={form.control}
              name="confirmPassword"
              placeholder="***********"
              label="Confirm Password"
              className="rounded-full"
            />
          </FormProvider>
        </View>
      </ScrollView>
      <View className="gap-y-3">
        <Link
          href={{
            pathname: '/forgot-password',
            params: {
              email: form.watch('email'),
            },
          }}
          asChild>
          <Button variant="plain">
            <Text className="font-normal text-muted-foreground">Resend Token</Text>
          </Button>
        </Link>
        <Button>
          <Text>Reset</Text>
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ResetPassword;
