import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import * as React from 'react';

import { Button, ButtonProps } from '../button';
import { Text } from '../text';

import { cn } from '~/lib/cn';

type Props = Omit<React.ComponentProps<typeof DateTimePicker>, 'onChange'> & {
  className?: string;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  onValueChange?: (date?: Date) => void;
  placeholder?: string;
};

export function DatePicker({
  value,
  onValueChange,
  maximumDate,
  minimumDate,
  className,
  size,
  variant,
}: Props) {
  const [date, setDate] = React.useState<Date>(value || new Date());
  const show = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (v, date) => {
        onValueChange?.(date);
        date && setDate(date);
      },
      mode: 'date',
      minimumDate,
      maximumDate,
      style: { backgroundColor: 'red' },
    });
  };

  return (
    <Button
      onPress={show}
      variant={variant || 'outline'}
      size={size}
      className={cn('native:h-12 h-10 border-input shadow-none', className)}>
      <Text className="text-sm font-normal">
        {new Intl.DateTimeFormat('en-US', {
          dateStyle: 'medium',
        }).format(value)}
      </Text>
    </Button>
  );
}
