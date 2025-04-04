import { Control, FieldValues, Path } from 'react-hook-form';

import { FormDescription, FormField, FormItem, FormLabel } from '../form';
import { Input } from '../input';
import { Picker, PickerItem } from '../picker';

import { useColorScheme } from '~/lib/useColorScheme';

export type InputProps = React.ComponentProps<typeof Input>;

type SelectInputProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  control: Control<T>;
  placeholder?: string;
  wrapperClassName?: string;
  className?: string;
  options: { label: string; value: string }[];
};

export const SelectInput = <T extends FieldValues>({
  control,
  name,
  label,
  wrapperClassName,
  className,
  options,
  placeholder,
}: SelectInputProps<T>) => {
  const { colors } = useColorScheme();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <FormItem className={wrapperClassName}>
            {label && (
              <FormLabel className={fieldState.error ? 'text-red-500' : ''} id={name}>
                {label}
              </FormLabel>
            )}
            <Picker
              placeholder={placeholder}
              className={className}
              selectedValue={field.value}
              onValueChange={(item) => field.onChange(item)}>
              {options.map((option) => (
                <PickerItem
                  key={option.value}
                  label={option.label}
                  value={option.value}
                  color={colors.foreground}
                  style={{
                    backgroundColor: colors.root,
                  }}
                />
              ))}
            </Picker>
            {fieldState.error && (
              <FormDescription className="text-red-500">{fieldState.error.message}</FormDescription>
            )}
          </FormItem>
        );
      }}
    />
  );
};
