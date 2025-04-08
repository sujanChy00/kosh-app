import { FontAwesome } from '@expo/vector-icons';
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
import { TextDivider } from '~/components/ui/text-divider';
import { useColorScheme } from '~/hooks/use-color-scheme';

const schema = z
  .object({
    email: z.string().email().optional(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    userName: z.string().min(1),
    phoneNo: z.string().min(10),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const Register = () => {
  const { colors } = useColorScheme();
  const params = useLocalSearchParams<{ userId?: string }>();
  const email = params?.userId?.includes('@') ? params?.userId : undefined;
  const phone = params?.userId?.includes('@') ? undefined : params?.userId;
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      password: '',
      confirmPassword: '',
      userName: '',
      phoneNo: phone,
      email,
    },
    resolver: zodResolver(schema),
  });
  return (
    <KeyboardGestureArea interpolator="linear" style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="p-4"
        style={{
          flex: 1,
        }}>
        <View className="gap-y-5">
          <FormProvider {...form}>
            <TextInput
              control={form.control}
              name="userName"
              placeholder="your name"
              label="Name"
              className="rounded-full"
            />
            <TextInput
              control={form.control}
              name="phoneNo"
              placeholder="98********"
              label="Phone number"
              className="rounded-full"
              inputMode="tel"
              keyboardType="phone-pad"
            />
            <TextInput
              control={form.control}
              name="email"
              placeholder="so***@gmail.com"
              label="Email"
              className="rounded-full"
              inputMode="email"
              keyboardType="email-address"
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
          <View className="gap-y-3 pt-3">
            <Button variant="secondary" className="rounded-full">
              <Text>Sign up</Text>
            </Button>
          </View>
        </View>
        <View className="flex-row items-center justify-center pt-2">
          <Text className="text-sm text-muted-foreground">Don't have an account ? </Text>
          <Link
            href={{
              pathname: '/login',
              params: {
                phone: form.watch('phoneNo'),
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
      </KeyboardAwareScrollView>
    </KeyboardGestureArea>
  );
};

export default Register;
