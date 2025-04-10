import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocalSearchParams } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView, KeyboardGestureArea } from 'react-native-keyboard-controller';
import { z } from 'zod';

import { Button } from '~/components/ui/button';
import { PasswordInput } from '~/components/ui/form-inputs/password-input';
import { TextInput } from '~/components/ui/form-inputs/text-input';
import { Text } from '~/components/ui/text';

const schema = z
  .object({
    userId: z.string().min(1),
    token: z.string().min(6),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const ResetPassword = () => {
  const params = useLocalSearchParams<{ userId?: string; token?: string }>();
  const form = useForm({
    defaultValues: {
      userId: params?.userId || '',
      token: params?.token || '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(schema),
  });
  return (
    <KeyboardGestureArea interpolator="linear" style={{ flex: 1 }}>
      <KeyboardAwareScrollView contentContainerClassName="gap-y-10 p-4 pt-20" className="flex-1 ">
        <View className="gap-y-5">
          <FormProvider {...form}>
            <TextInput
              control={form.control}
              name="userId"
              placeholder="email or phone number"
              className="rounded-full"
              label="User ID"
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
        <View className="gap-y-3">
          <Link
            href={{
              pathname: '/forgot-password',
              params: {
                userId: form.watch('userId'),
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
      </KeyboardAwareScrollView>
    </KeyboardGestureArea>
  );
};

export default ResetPassword;
