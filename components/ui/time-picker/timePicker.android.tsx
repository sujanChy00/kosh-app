import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { View } from 'react-native';

import { Button, ButtonProps } from '../button';
import { Text } from '../text';

import { cn } from '~/lib/cn';

type Props = Omit<React.ComponentProps<typeof DateTimePicker>, 'onChange'> & {
  materialDateClassName?: string;
  materialDateLabel?: string;
  materialDateLabelClassName?: string;
  materialTimeClassName?: string;
  materialTimeLabel?: string;
  materialTimeLabelClassName?: string;
  className?: string;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  onValueChange?: (date?: Date) => void;
  placeholder?: string;
};

export const TimePicker = ({ value, onValueChange, variant, className, size, ...props }: Props) => {
  const [date, setDate] = useState<Date>(value || new Date());
  const show = () => () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (v, date) => {
        onValueChange?.(date);
        date && setDate(date);
      },
      mode: 'date',
      minimumDate: props.minimumDate,
      maximumDate: props.maximumDate,
    });
  };
  return (
    <View className={cn('relative pt-1.5', props.materialTimeClassName)}>
      <Button
        variant={variant || 'plain'}
        androidRootClassName="rounded-none"
        onPress={show}
        size={size}
        className={cn(
          'border-foreground/30 rounded border px-2.5 py-3 active:opacity-80',
          className
        )}>
        <Text className="py-px text-sm">
          {new Intl.DateTimeFormat('en-US', {
            timeStyle: 'short',
          }).format(value)}
        </Text>
      </Button>
      <View className={cn('absolute left-2 top-0 bg-card px-1', props.materialTimeLabelClassName)}>
        <Text variant="caption2" className="text-[10px] opacity-60">
          {props.materialTimeLabel ?? 'Time'}
        </Text>
      </View>
    </View>
  );
};
