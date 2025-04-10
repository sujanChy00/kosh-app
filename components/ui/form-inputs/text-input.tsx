import React from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { View } from 'react-native';

import { FormDescription, FormField, FormItem, FormLabel } from '../form';
import { Input } from '../input';

import { cn } from '~/lib/cn';

export type InputProps = React.ComponentProps<typeof Input>;

type TextInputProps<T extends FieldValues> = InputProps & {
  name: Path<T>;
  label?: string;
  control: Control<T>;
  placeholder?: string;
  wrapperClassName?: string;
  rightSection?: React.ReactNode;
};

export const TextInput = <T extends FieldValues>({
  control,
  name,
  label,
  wrapperClassName,
  rightSection,
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
            <View
              className={cn(
                'flex-row items-center justify-between overflow-hidden border border-input',
                rightSection && 'pr-2',
                props.className
              )}>
              <Input
                autoComplete="off"
                {...props}
                isError={!!fieldState.error}
                id={name}
                className="flex-1 border-0 shadow-none"
                value={String(field.value || '')}
                autoCapitalize="none"
                onChangeText={(text) => {
                  props.onChangeText?.(text);
                  field.onChange(text);
                }}
              />
              {rightSection}
            </View>
            {fieldState.error && (
              <FormDescription className="text-red-500">{fieldState.error.message}</FormDescription>
            )}
          </FormItem>
        );
      }}
    />
  );
};
