import { BottomSheetView } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { Children, cloneElement, isValidElement, ReactElement, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { z } from 'zod';

import { ContactsSheet } from '../contacts/contact-sheet';
import { Button } from '../ui/button';
import { CheckboxInput } from '../ui/form-inputs/checkbox-input';
import { TextInput } from '../ui/form-inputs/text-input';
import { Sheet, useSheetRef } from '../ui/sheet';
import { Text } from '../ui/text';

import { PlusIcon } from '~/components/icons/plus-icon';
import { isIos } from '~/lib/constants';
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
type Member = z.infer<typeof schema>;

interface Props {
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<(Member & { id: number })[]>>;
  children?: React.ReactNode;
  asChild?: boolean;
}

export const KoshMemberFormSheet = ({ members, setMembers, children, asChild }: Props) => {
  const ref = useSheetRef();

  const form = useForm<Member>({
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const isManager = form.watch('isManager');
  const managerPower = form.watch('managerPowers');

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

  const open = () => {
    ref.current?.present();
  };

  useEffect(() => {
    if (members.length === 0) {
      open();
    }
  }, [members]);

  return (
    <>
      {asChild ? (
        Children.map(children, (child) => {
          if (isValidElement(child)) {
            return cloneElement(child as ReactElement<{ onPress?: () => void }>, {
              onPress: open,
            });
          }
          return child;
        })
      ) : (
        <TouchableOpacity onPress={open}>{children}</TouchableOpacity>
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
                        form.setValue('managerPowers', p.value as any);
                      }}
                      key={p.value}
                      size="sm"
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
    </>
  );
};
