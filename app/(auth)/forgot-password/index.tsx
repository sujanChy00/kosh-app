import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocalSearchParams } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { z } from 'zod';

import { Button } from '~/components/ui/button';
import { TextInput } from '~/components/ui/form-inputs/text-input';
import { Text } from '~/components/ui/text';
import { isIos } from '~/lib/constants';

const schema = z.object({
  userId: z.string().email(),
});

const ForgotPassword = () => {
  const params = useLocalSearchParams<{ userId?: string }>();
  const form = useForm({
    defaultValues: {
      userId: params?.userId || '',
    },
    resolver: zodResolver(schema),
  });
  return (
    <KeyboardAvoidingView
      behavior={isIos ? 'padding' : 'height'}
      className="p-4"
      style={{
        flex: 1,
      }}>
      <View className="flex-1 items-stretch justify-center gap-y-6">
        <FormProvider {...form}>
          <TextInput
            control={form.control}
            name="userId"
            placeholder="email or phone number"
            className="rounded-full"
          />
          <Button variant="tonal" onPress={form.handleSubmit((data) => console.log(data))}>
            <Text>Send</Text>
          </Button>
        </FormProvider>
      </View>
      <View className="flex-row items-center justify-center pt-2">
        <Text className="text-sm text-muted-foreground">Already have a code ? </Text>
        <Link
          href={{
            pathname: '/forgot-password/reset-password',
            params: {
              userId: form.watch('userId'),
            },
          }}>
          <Text className="text-sm font-semibold text-primary underline">Reset</Text>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
