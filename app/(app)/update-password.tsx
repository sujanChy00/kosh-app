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
    <KeyboardAvoidingView
      keyboardVerticalOffset={90}
      className="p-4"
      style={{
        flex: 1,
      }}
      behavior={isIos ? 'padding' : 'height'}>
      <View className="flex-1 gap-y-3">
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

      <Button variant="tonal">
        <Text>Update</Text>
      </Button>
    </KeyboardAvoidingView>
  );
};

export default UpdatePassword;
