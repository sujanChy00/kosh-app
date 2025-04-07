import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  fineAmount: z.coerce.number().min(1),
  startDate: z.date(),
  endDate: z.date(),
  minimumAmount: z.coerce.number().min(1),
  fineDuration: z.coerce.number().min(1),
  interestPercentage: z.coerce.number().min(1),
  members: z.array(z.string()).optional(),
  managers: z.array(z.string()).optional(),
});

const KoshEdit = () => {
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
      members: [],
      managers: [],
    },
    resolver: zodResolver(schema),
  });
  return (
    <KeyboardAwareScrollView className="flex-1 p-4">
      <Text>KoshEdit</Text>
    </KeyboardAwareScrollView>
  );
};

export default KoshEdit;
