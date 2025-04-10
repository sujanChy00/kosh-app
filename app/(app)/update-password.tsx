import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

import { PasswordInput } from '~/components/ui/form-inputs/password-input';
import { Text } from '~/components/ui/text';

const schema = z
  .object({
    oldPassword: z.string().min(6),
    newPassword: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const UpdatePassword = () => {
  const form = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    resolver: zodResolver(schema),
  });
  return (
    <SafeAreaView className="flex-1 p-4">
      <Stack.Screen
        options={{
          title: 'Update Password',
          headerRight: () => (
            <Pressable>
              <Text className="font-medium">save</Text>
            </Pressable>
          ),
        }}
      />
      <View className="gap-y-5">
        <FormProvider {...form}>
          <PasswordInput
            control={form.control}
            name="oldPassword"
            label="Old Password"
            className="rounded-full"
          />
          <PasswordInput
            control={form.control}
            name="newPassword"
            label="New Password"
            className="rounded-full"
          />
          <PasswordInput
            control={form.control}
            name="confirmPassword"
            label="Confirm Password"
            className="rounded-full"
          />
        </FormProvider>
      </View>
    </SafeAreaView>
  );
};

export default UpdatePassword;
