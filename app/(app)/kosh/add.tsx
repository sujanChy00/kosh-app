import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { Pressable, View } from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardGestureArea,
  KeyboardToolbar,
} from 'react-native-keyboard-controller';
import { z } from 'zod';

import { DateInput } from '~/components/ui/form-inputs/date-input';
import { TextAreaInput } from '~/components/ui/form-inputs/text-area-input';
import { TextInput } from '~/components/ui/form-inputs/text-input';
import { Spacer } from '~/components/ui/spacer';
import { Text } from '~/components/ui/text';

const schema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  fineAmount: z.coerce.number().min(1),
  startDate: z.date(),
  endDate: z.date(),
  minimumAmount: z.coerce.number().min(1),
  fineDuration: z.coerce.number().min(1),
  interestPercentage: z.coerce.number().min(1),
});

const KoshAdd = () => {
  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
      fineAmount: 0,
      startDate: new Date(),
      endDate: new Date(),
      minimumAmount: 0,
      fineDuration: 0,
      interestPercentage: 0,
    },
    resolver: zodResolver(schema),
  });
  const onSubmit = form.handleSubmit((data) => console.log(data));
  return (
    <KeyboardGestureArea interpolator="linear" style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: 'Add Kosh',
          headerRight: () => (
            <Pressable onPress={onSubmit}>
              <Text className="font-medium">save</Text>
            </Pressable>
          ),
        }}
      />
      <KeyboardAwareScrollView
        bottomOffset={100}
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="p-4"
        className="flex-1"
        keyboardDismissMode="interactive">
        <View className="gap-y-5">
          <FormProvider {...form}>
            <TextInput
              control={form.control}
              name="name"
              label="Name"
              placeholder="my kosh"
              className="rounded-full"
            />
            <TextAreaInput
              control={form.control}
              name="description"
              label="Description (optional)"
              placeholder="we are a group of friends who want to save money"
            />
            <TextInput
              control={form.control}
              name="fineAmount"
              label="Fine Amount"
              placeholder="Rs. 100"
              className="rounded-full"
              inputMode="numeric"
              keyboardType="numeric"
            />
            <TextInput
              control={form.control}
              name="minimumAmount"
              label="Minimum Amount"
              placeholder="Rs. 2000"
              className="rounded-full"
              inputMode="numeric"
              keyboardType="numeric"
            />
            <TextInput
              control={form.control}
              name="fineDuration"
              label="Fine Duration (in days)"
              placeholder="example: 3 days"
              className="rounded-full"
              inputMode="numeric"
              keyboardType="numeric"
            />
            <TextInput
              control={form.control}
              name="interestPercentage"
              label="Interest Percentage (%)"
              placeholder="example: 2%"
              className="rounded-full"
              inputMode="numeric"
              keyboardType="numeric"
            />
            <DateInput
              control={form.control}
              name="startDate"
              label="Start Date"
              className="rounded-full"
              maxDate={new Date()}
            />
            <DateInput
              control={form.control}
              name="endDate"
              label="End Date"
              className="rounded-full"
              minDate={new Date()}
            />
          </FormProvider>
        </View>
        <Spacer height={40} />
      </KeyboardAwareScrollView>
      <KeyboardToolbar />
    </KeyboardGestureArea>
  );
};

export default KoshAdd;
