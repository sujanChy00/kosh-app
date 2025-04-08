import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { Pressable, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { z } from 'zod';

import { ProfileImagePicker } from '~/components/profile-image-picker';
import { TextInput } from '~/components/ui/form-inputs/text-input';
import { Text } from '~/components/ui/text';

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional(),
  phoneNo: z.coerce.number().min(10),
});

const ProfileUpdate = () => {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phoneNo: 0,
    },
    resolver: zodResolver(schema),
  });

  return (
    <KeyboardAwareScrollView contentContainerClassName="gap-y-10 p-4" className="flex-1">
      <Stack.Screen
        options={{
          title: 'Edit Profile',
          headerRight: () => (
            <Pressable>
              <Text>update</Text>
            </Pressable>
          ),
        }}
      />
      <ProfileImagePicker
        onImagePicked={async (image) => {
          console.log(image);
          // const response = await fetch(image);
          // const blob = await response.blob();
          // const reader = new FileReader();
          // reader.readAsDataURL(blob);
          // reader.onloadend = () => {
          //   const base64data = reader.result as string;
          //   console.log(base64data);
          // };
        }}
      />
      <FormProvider {...form}>
        <View className="gap-y-3">
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
            placeholder="email"
            className="rounded-full"
            inputMode="email"
            keyboardType="email-address"
          />
          <TextInput
            control={form.control}
            name="phoneNo"
            label="Phone No."
            placeholder="phone no."
            className="rounded-full"
            inputMode="numeric"
            keyboardType="numeric"
          />
        </View>
      </FormProvider>
    </KeyboardAwareScrollView>
  );
};

export default ProfileUpdate;
