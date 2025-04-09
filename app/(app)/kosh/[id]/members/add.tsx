import { BottomSheetView } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Pressable, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

import Animated, { FadeIn, withSpring } from 'react-native-reanimated';
import { z } from 'zod';

import { ContactsSheet } from '~/components/contacts/contact-sheet';
import { KoshMemberCard } from '~/components/kosh/kosh-member-card';
import { Button } from '~/components/ui/button';
import { CheckboxInput } from '~/components/ui/form-inputs/checkbox-input';
import { TextInput } from '~/components/ui/form-inputs/text-input';
import { Sheet, useSheetRef } from '~/components/ui/sheet';
import { Spacer } from '~/components/ui/spacer';
import { Text } from '~/components/ui/text';
import { PlusIcon } from '~/components/icons/plus-icon';
import { isIos } from '~/lib/constants';
import { LegendList } from '@legendapp/list';

const managerPowers = [
  {
    label: 'all',
    value: 'all',
  },
  {
    label: 'withdrawals only',
    value: 'withdrawals',
  },
  {
    label: 'manage members',
    value: 'manage_members',
  },
];

const schema = z.object({
  phoneNo: z.string().min(10),
  name: z.string().min(1),
  email: z.string().email().optional(),
  isManager: z.boolean().optional(),
  managerPowers: z.enum(['all', 'withdrawals', 'manage_members']).optional(),
});

const ATouchable = Animated.createAnimatedComponent(TouchableOpacity);

type Member = z.infer<typeof schema>;

const Page = () => {
  const ref = useSheetRef();
  const [members, setMembers] = useState<(Member & { id: number })[]>([]);
  const form = useForm<Member>({
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const removeMember = (id: number) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };

  const onSubmit = form.handleSubmit((data) => {
    const phoneNumberAlreadyExists = members.some((member) => member.phoneNo === data.phoneNo);
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
    ref.current?.dismiss();
  });

  const isManager = form.watch('isManager');
  const managerPower = form.watch('managerPowers');

  useEffect(() => {
    if (members.length === 0) {
      ref.current?.present();
    }
  }, [members]);
  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          title: 'Add Member',
          headerRight: () => (
            <View className="flex-row items-center gap-x-3">
              {members.length > 0 && (
                <ATouchable
                  entering={FadeIn.easing(withSpring)}
                  onPress={() => {
                    ref.current?.present();
                  }}>
                  <PlusIcon className="text-foreground" />
                </ATouchable>
              )}
              <ATouchable disabled={members.length === 0}>
                <Text
                  className={`font-medium ${members.length === 0 ? 'text-muted-foreground' : 'text-foreground'}`}>
                  save
                </Text>
              </ATouchable>
            </View>
          ),
        }}
      />
      {members.length === 0 && (
        <View className="flex-1 items-center justify-center gap-y-3">
          <Text className="text-muted-foreground">No members added yet</Text>
          <Button
            variant="secondary"
            onPress={() => {
              ref.current?.present();
            }}>
            <PlusIcon className="text-secondary-foreground" />
            <Text> Add Member</Text>
          </Button>
        </View>
      )}
      <Sheet ref={ref} snapPoints={[500, 800]} index={1}>
        <BottomSheetView className="flex-1 p-4">
          <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} className="flex-1 gap-y-5">
            <FormProvider {...form}>
              <TextInput
                control={form.control}
                name="phoneNo"
                label="Phone No."
                placeholder="98********"
                className="rounded-full"
                inputMode="tel"
                rightSection={
                  <ContactsSheet
                    onSelect={({ name, number }) => {
                      form.setValue('phoneNo', number);
                      form.setValue('name', name);
                    }}
                  />
                }
                keyboardType="phone-pad"
              />

              <TextInput
                control={form.control}
                name="name"
                label="Name"
                placeholder={isManager ? 'manager name' : 'member name'}
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
              {isManager && (
                <Animated.View
                  entering={FadeIn}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                  }}>
                  {managerPowers.map((p) => (
                    <Button
                      onPress={() => {
                        form.setValue('managerPowers', p.value);
                      }}
                      key={p.value}
                      size={'sm'}
                      variant={managerPower === p.value ? 'secondary' : 'outline'}>
                      <Text>{p.label}</Text>
                    </Button>
                  ))}
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
                label="Make this user a manager"
              />
              <Button variant="muted" onPress={onSubmit}>
                <PlusIcon className="text-muted-foreground dark:text-muted" />
                <Text className="text-muted-foreground dark:text-muted">Add</Text>
              </Button>
            </FormProvider>
          </KeyboardAvoidingView>
        </BottomSheetView>
      </Sheet>
      {members.length > 0 && (
        <LegendList
          estimatedItemSize={98}
          contentContainerStyle={{ padding: 16 }}
          ItemSeparatorComponent={() => <View className="h-3" />}
          recycleItems
          removeClippedSubviews
          data={members}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <KoshMemberCard {...item} removeMember={removeMember} />}
        />
      )}
      <Spacer height={60} />
    </View>
  );
};

export default Page;
