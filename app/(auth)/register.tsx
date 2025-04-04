import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import { z } from 'zod';

import { TextInput } from '~/components/ui/form-inputs/text-input';
const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    userName: z.string().min(1),
    phoneNo: z.number().min(10),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const Register = () => {
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      userName: '',
      phoneNo: 0,
    },
    resolver: zodResolver(schema),
  });
  return (
    <ScrollView className="flex-1 p-6">
      <FormProvider {...form}>
        <TextInput
          control={form.control}
          name="email"
          label="Email"
          inputMode="email"
          placeholder="email"
          keyboardType="email-address"
        />
      </FormProvider>
    </ScrollView>
  );
};

export default Register;
