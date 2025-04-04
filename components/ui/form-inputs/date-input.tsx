import { Control, FieldValues, Path } from 'react-hook-form';

import { DatePicker } from '../date-picker';
import { FormDescription, FormField, FormItem, FormLabel } from '../form';

import { cn } from '~/lib/cn';

type DateInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string | React.ReactNode;
  wrapperClassName?: string;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
};

export const DateInput = <T extends FieldValues>({
  control,
  name,
  label,
  wrapperClassName,
  maxDate,
  minDate,
  className,
}: DateInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={wrapperClassName}>
          {label && (
            <FormLabel className={fieldState.error ? 'text-red-500' : ''} id={name}>
              {label}
            </FormLabel>
          )}
          <DatePicker
            minimumDate={minDate}
            maximumDate={maxDate}
            value={field.value}
            onValueChange={field.onChange}
            className={cn(className, fieldState.error?.message ? 'border border-red-500' : '')}
          />
          {fieldState.error && (
            <FormDescription className="text-red-500">{fieldState.error.message}</FormDescription>
          )}
        </FormItem>
      )}
    />
  );
};
