import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView, KeyboardGestureArea } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { z } from 'zod';

import { Button } from '~/components/ui/button';
import { DateInput } from '~/components/ui/form-inputs/date-input';
import { TextAreaInput } from '~/components/ui/form-inputs/text-area-input';
import { TextInput } from '~/components/ui/form-inputs/text-input';
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
  const { bottom } = useSafeAreaInsets();
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
  return (
    <KeyboardGestureArea interpolator="linear" style={{ flex: 1, paddingBottom: bottom }}>
      <KeyboardAwareScrollView
        className="flex-1"
        contentContainerClassName="p-4"
        keyboardShouldPersistTaps="handled">
        <View className="gap-y-3 pb-6">
          <FormProvider {...form}>
            <TextInput
              control={form.control}
              name="name"
              label="Name"
              placeholder="kosh name"
              className="rounded-full"
            />
            <TextAreaInput
              control={form.control}
              name="description"
              label="Description (optional)"
              placeholder="kosh description"
            />
            <TextInput
              control={form.control}
              name="fineAmount"
              label="Fine Amount"
              placeholder="fine amount"
              className="rounded-full"
              inputMode="numeric"
              keyboardType="numeric"
            />
            <TextInput
              control={form.control}
              name="minimumAmount"
              label="Minimum Amount"
              placeholder="minimum amount"
              className="rounded-full"
              inputMode="numeric"
              keyboardType="numeric"
            />
            <TextInput
              control={form.control}
              name="fineDuration"
              label="Fine Duration (in days)"
              placeholder="fine duration"
              className="rounded-full"
              inputMode="numeric"
              keyboardType="numeric"
            />
            <TextInput
              control={form.control}
              name="interestPercentage"
              label="Interest Percentage (%)"
              placeholder="interest percentage"
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
        <Button variant="tonal" onPress={form.handleSubmit((data) => console.log(data))}>
          <Text>Add</Text>
        </Button>
      </KeyboardAwareScrollView>
    </KeyboardGestureArea>
  );
};

export default KoshAdd;
