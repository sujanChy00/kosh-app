import { Control, FieldValues, Path } from 'react-hook-form';

import { FormDescription, FormField, FormItem, FormLabel } from '../form';
import { Input } from '../input';
import { Textarea } from '../text-area';

export type InputProps = React.ComponentProps<typeof Input>;

type TextInputProps<T extends FieldValues> = InputProps & {
  name: Path<T>;
  label?: string;
  control: Control<T>;
  placeholder?: string;
  wrapperClassName?: string;
};

export const TextAreaInput = <T extends FieldValues>({
  control,
  name,
  label,
  wrapperClassName,
  ...props
}: TextInputProps<T>) => {
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
            <Textarea
              autoComplete="off"
              {...props}
              isError={!!fieldState.error}
              id={name}
              value={String(field.value || '')}
              autoCapitalize="none"
              onChangeText={(text) => {
                props.onChangeText?.(text);
                field.onChange(text);
              }}
            />
            {fieldState.error && (
              <FormDescription className="text-red-500">{fieldState.error.message}</FormDescription>
            )}
          </FormItem>
        );
      }}
    />
  );
};
