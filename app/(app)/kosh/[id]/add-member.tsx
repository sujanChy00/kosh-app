import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView, KeyboardGestureArea } from 'react-native-keyboard-controller';
import Animated, { FadeIn } from 'react-native-reanimated';
import { z } from 'zod';

import { KoshMemberCard } from '~/components/kosh/kosh-member-card';
import { Button } from '~/components/ui/button';
import { CheckboxInput } from '~/components/ui/form-inputs/checkbox-input';
import { SelectInput } from '~/components/ui/form-inputs/select-input';
import { TextInput } from '~/components/ui/form-inputs/text-input';
import { Spacer } from '~/components/ui/spacer';
import { Text } from '~/components/ui/text';

const schema = z.object({
  phoneNo: z.coerce.number().min(10),
  name: z.string().min(1),
  email: z.string().email().optional(),
  isManager: z.boolean().optional(),
  managerPowers: z.enum(['all', 'transactions']).optional(),
});

type Member = z.infer<typeof schema>;

const KoshMember = () => {
  const [members, setMembers] = useState<(Member & { id: number })[]>([]);
  const form = useForm<Member>({
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const removeMember = (id: number) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };

  const isManager = form.watch('isManager');
  return (
    <KeyboardGestureArea interpolator="linear" style={{ flex: 1 }}>
      <KeyboardAwareScrollView className="flex-1 p-4" keyboardShouldPersistTaps="handled">
        <View className="gap-y-6">
          <View className="gap-y-3">
            <FormProvider {...form}>
              <TextInput
                control={form.control}
                name="phoneNo"
                label="Phone No."
                placeholder="phone no."
                className="rounded-full"
                inputMode="numeric"
                keyboardType="numeric"
              />
              <TextInput
                control={form.control}
                name="name"
                label="Name"
                placeholder="name"
                className="rounded-full"
              />
              <TextInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="email (optional)"
                className="rounded-full"
                inputMode="email"
                keyboardType="email-address"
              />
              {isManager && (
                <Animated.View entering={FadeIn}>
                  <SelectInput
                    control={form.control}
                    name="managerPowers"
                    label="Manager Powers"
                    placeholder="manager powers"
                    className="rounded-full"
                    options={[
                      { label: 'All', value: 'all' },
                      { label: 'Transactions', value: 'transactions' },
                    ]}
                  />
                </Animated.View>
              )}
              <CheckboxInput
                onCheckedChange={(o) => {
                  if (o) {
                    form.setValue('managerPowers', 'all');
                  } else {
                    form.setValue('managerPowers', undefined);
                  }
                }}
                control={form.control}
                wrapperClassName="justify-end"
                name="isManager"
                label="make manager"
              />
            </FormProvider>
          </View>
          <Button
            variant="tonal"
            onPress={form.handleSubmit((data) => {
              const phoneNumberAlreadyExists = members.some(
                (member) => member.phoneNo === data.phoneNo
              );
              if (phoneNumberAlreadyExists) {
                form.setError('phoneNo', {
                  message: 'Phone number already exists',
                });
                return;
              }
              if (data.isManager && (!data.managerPowers || data.managerPowers.length === 0)) {
                form.setError('managerPowers', {
                  message: 'Please select manager powers',
                });
                return;
              }
              setMembers((prev) => [...prev, { ...data, id: prev.length }]);
              form.reset();
            })}>
            <Text>Add</Text>
          </Button>
        </View>
        {members.length > 0 && (
          <View className="mt-6">
            <Text className="text-lg font-semibold">Members</Text>
            <View className="mt-3 gap-y-3">
              {members.map((member, index) => (
                <KoshMemberCard {...member} key={index} removeMember={removeMember} id={index} />
              ))}
            </View>
          </View>
        )}
        <Spacer height={60} />
      </KeyboardAwareScrollView>
    </KeyboardGestureArea>
  );
};

export default KoshMember;
