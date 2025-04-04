import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocalSearchParams } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, View } from 'react-native';
import { z } from 'zod';

import { Button } from '~/components/ui/button';
import { TextInput } from '~/components/ui/form-inputs/text-input';
import { Text } from '~/components/ui/text';

const schema = z.object({
  email: z.string().email(),
});

const ForgotPassword = () => {
  const params = useLocalSearchParams<{ email?: string }>();
  const form = useForm({
    defaultValues: {
      email: params?.email || '',
    },
    resolver: zodResolver(schema),
  });
  return (
    <KeyboardAvoidingView
      className="p-4"
      style={{
        flex: 1,
      }}>
      <View className="flex-1 items-stretch justify-center gap-y-6">
        <FormProvider {...form}>
          <TextInput
            control={form.control}
            name="email"
            placeholder="so***@gmail.com"
            className="rounded-full"
            inputMode="email"
            keyboardType="email-address"
          />
          <Button variant="tonal">
            <Text>Send</Text>
          </Button>
        </FormProvider>
      </View>
      <View className="flex-row items-center justify-center pt-2">
        <Text className="text-sm text-muted-foreground">Already have a code ? </Text>
        <Link
          href={{
            pathname: '/reset-password',
            params: {
              email: form.watch('email'),
            },
          }}>
          <Text className="text-sm font-semibold text-primary underline">Reset</Text>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
