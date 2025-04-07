import { Control, FieldValues, Path } from 'react-hook-form';
import { Pressable, View } from 'react-native';

import { Checkbox } from '../checkbox';
import { FormDescription, FormField, FormItem, FormLabel } from '../form';
import { Input } from '../input';

import { cn } from '~/lib/cn';

export type InputProps = React.ComponentProps<typeof Input>;

type CheckboxInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  wrapperClassName?: string;
  className?: string;
  onCheckedChange?: (o: boolean) => void;
};

export const CheckboxInput = <T extends FieldValues>({
  control,
  name,
  label,
  wrapperClassName,
  className,
  onCheckedChange,
}: CheckboxInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <FormItem>
            <Pressable
              className={cn('gap-x-1- flex-row items-center', wrapperClassName)}
              onPress={() => {
                field.onChange(!field.value);
                onCheckedChange?.(!field.value);
              }}>
              <View className={cn('mb-2 size-8', className)}>
                <Checkbox checked={field.value} />
              </View>
              <FormLabel className={fieldState.error ? 'text-red-500' : ''} id={name}>
                {label}
              </FormLabel>
            </Pressable>
            {fieldState.error && (
              <FormDescription className="text-red-500">{fieldState.error.message}</FormDescription>
            )}
          </FormItem>
        );
      }}
    />
  );
};
