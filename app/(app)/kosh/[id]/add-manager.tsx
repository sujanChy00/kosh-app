import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Pressable, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { z } from 'zod';

import { ContactsSheet } from '~/components/contacts/contact-sheet';
import { KoshManagerCard } from '~/components/kosh/kosh-manager-card';
import { SelectInput } from '~/components/ui/form-inputs/select-input';
import { TextInput } from '~/components/ui/form-inputs/text-input';
import { Spacer } from '~/components/ui/spacer';
import { Text } from '~/components/ui/text';

const schema = z.object({
  phoneNo: z.string().min(10),
  name: z.string().min(1),
  email: z.string().email().optional(),
  managerPowers: z.enum(['all', 'transactions']),
});

type Manager = z.infer<typeof schema>;

const AddManagerScreen = () => {
  const [managers, setManagers] = useState<(Manager & { id: number })[]>([]);
  const form = useForm<Manager>({
    defaultValues: {
      managerPowers: 'all',
    },
    resolver: zodResolver(schema),
  });

  const removeMember = (id: number) => {
    setManagers((prev) => prev.filter((member) => member.id !== id));
  };
  return (
    <KeyboardAwareScrollView
      className="flex-1 p-4"
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        paddingTop: 20,
      }}>
      <Stack.Screen
        options={{
          title: 'Add Manager',
          headerRight: () => (
            <Pressable
              onPress={form.handleSubmit((data) => {
                setManagers((prev) => [...prev, { ...data, id: prev.length }]);
                form.reset();
              })}>
              <Text className="font-medium">save</Text>
            </Pressable>
          ),
        }}
      />
      <FormProvider {...form}>
        <View className="gap-y-5">
          <TextInput
            control={form.control}
            name="phoneNo"
            label="Phone No."
            placeholder="98********"
            className="rounded-full"
            inputMode="tel"
            keyboardType="phone-pad"
            rightSection={
              <ContactsSheet
                onSelect={({ name, number }) => {
                  form.setValue('phoneNo', number);
                  form.setValue('name', name);
                }}
              />
            }
          />
          <TextInput
            control={form.control}
            name="name"
            label="Name"
            placeholder="manager name"
            className="rounded-full"
          />
          <TextInput
            control={form.control}
            name="email"
            label="Email (optional)"
            placeholder="so***@gmail.com"
            className="rounded-full"
            inputMode="email"
            keyboardType="email-address"
          />
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
        </View>
      </FormProvider>

      {managers.length > 0 && (
        <View className="mt-6">
          <Text className="text-lg font-semibold">Managers</Text>
          <View className="mt-3 gap-y-3">
            {managers.map((member, index) => (
              <KoshManagerCard {...member} key={index} removeMember={removeMember} id={index} />
            ))}
          </View>
        </View>
      )}
      <Spacer height={60} />
    </KeyboardAwareScrollView>
  );
};

export default AddManagerScreen;
