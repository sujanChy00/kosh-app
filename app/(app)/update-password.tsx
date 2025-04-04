import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, View } from 'react-native';
import { z } from 'zod';

import { Button } from '~/components/ui/button';
import { PasswordInput } from '~/components/ui/form-inputs/password-input';
import { Text } from '~/components/ui/text';
import { isIos } from '~/lib/constants';

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
    <View className="flex-1 justify-between p-4">
      <View>
        <Text className="text-center" variant="largeTitle">
          Update your password
        </Text>
      </View>
      <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} keyboardVerticalOffset={200}>
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
      </KeyboardAvoidingView>
      <Button variant="tonal">
        <Text>Update</Text>
      </Button>
    </View>
  );
};

export default UpdatePassword;
