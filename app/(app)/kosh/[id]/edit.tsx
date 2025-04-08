import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from 'expo-router';
import { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Pressable, ScrollView, View } from 'react-native';
import { KeyboardAwareScrollView, KeyboardGestureArea } from 'react-native-keyboard-controller';
import { z } from 'zod';

import { KoshManagerCard } from '~/components/kosh/kosh-manager-card';
import { KoshMemberCard } from '~/components/kosh/kosh-member-card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
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

type Member = {
  name: string;
  phoneNo: string;
  email?: string;
  isManager?: boolean;
  managerPowers?: string;
};

type Manager = {
  name: string;
  phoneNo: string;
  email?: string;
  managerPowers: string;
};

const KoshEdit = () => {
  const scrollRef = useRef<ScrollView>(null);
  const [members, setMembers] = useState<(Member & { id: number })[]>([
    {
      name: 'John Doe',
      phoneNo: '1234567890',
      email: 'johndoe@gmail.com',
      isManager: true,
      managerPowers: 'all',
      id: 0,
    },
    {
      name: 'Jane Doe',
      phoneNo: '1234567890',
      email: 'janedoe@gmail.com',
      isManager: false,
      managerPowers: 'transactions',
      id: 1,
    },
  ]);
  const [managers, setManagers] = useState<(Manager & { id: number })[]>([
    {
      name: 'John Doe',
      phoneNo: '1234567890',
      email: 'johndoe@gmail.com',
      managerPowers: 'all',
      id: 0,
    },
  ]);
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
  const removeMember = (id: number) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };
  const removeManager = (id: number) => {
    setManagers((prev) => prev.filter((member) => member.id !== id));
  };

  const showAccordion = managers?.length > 0 || members?.length > 0;

  const onSubmit = form.handleSubmit((data) => console.log(data));
  return (
    <KeyboardGestureArea interpolator="linear" style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: 'Edit Kosh',
          headerRight: () => (
            <Pressable onPress={onSubmit}>
              <Text className="font-medium">save</Text>
            </Pressable>
          ),
        }}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="p-4"
        className="flex-1"
        keyboardDismissMode="interactive"
        ref={scrollRef}>
        <FormProvider {...form}>
          <View className="gap-y-5">
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
              placeholder="exmaple: 3 days"
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
            {showAccordion && (
              <View className="pt-6">
                <Accordion type="single" scrollRef={scrollRef}>
                  {members?.length > 0 && (
                    <AccordionItem value="members">
                      <AccordionTrigger>
                        <Text>Members</Text>
                      </AccordionTrigger>
                      <AccordionContent className="gap-y-3">
                        {members.map((member, index) => (
                          <KoshMemberCard
                            className="shadow-none"
                            {...member}
                            key={index}
                            removeMember={removeMember}
                            id={index}
                          />
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  {managers?.length > 0 && (
                    <AccordionItem value="managers">
                      <AccordionTrigger>
                        <Text>Managers</Text>
                      </AccordionTrigger>
                      <AccordionContent className="gap-y-3">
                        {managers.map((manager, index) => (
                          <KoshManagerCard
                            className="shadow-none"
                            {...manager}
                            key={index}
                            removeMember={removeManager}
                            id={index}
                          />
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  )}
                </Accordion>
              </View>
            )}
          </View>
        </FormProvider>
        <Spacer height={20} />
      </KeyboardAwareScrollView>
    </KeyboardGestureArea>
  );
};

export default KoshEdit;
