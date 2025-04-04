import { useState } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { Pressable, TextInputProps, View } from 'react-native';

import { FormDescription, FormField, FormItem, FormLabel } from '../form';
import { Input } from '../input';
import { Text } from '../text';

import { cn } from '~/lib/cn';

type PasswordInputProps<T extends FieldValues> = TextInputProps & {
  name: Path<T>;
  label?: string;
  control: Control<T>;
};

/**
 * @description A React component that renders a password input field with visibility toggle.
 *
 * @template T Extends FieldValues
 * @typedef {Object} FieldValues - The type of the form values object.
 *
 * @typedef {Object} InputProps - Common properties for form inputs.
 * @property {string} [className] - CSS class names for the input element.
 * @property {string} [placeholder] - Placeholder text for the input element.
 * (Additional properties for your specific Input component)
 *
 * @typedef {Object} PasswordInputProps<T> extends InputProps
 * @property {Path<T>} name - The name of the field in the form values object.
 * @property {string} [label] - The label text for the password input.
 * @property {Control<T>} control - The form control object from React Hook Form.
 *
 * @returns {JSX.Element} The rendered password input component.
 */

export const PasswordInput = <T extends FieldValues>({
  name,
  control,
  label,
  className,
  ...props
}: PasswordInputProps<T>) => {
  const [showPassword, togglePasswordVisibility] = useState(false);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <FormItem>
            {label && (
              <FormLabel className={fieldState.error ? 'text-red-500' : ''} id={name}>
                {label}
              </FormLabel>
            )}
            <View className="relative">
              <Input
                {...props}
                isError={!!fieldState.error}
                id={name}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                onChangeText={field.onChange}
                placeholder={props.placeholder || '***********'}
                className={cn('pr-8', className)}
              />
              <Pressable
                onPress={() => {
                  togglePasswordVisibility((prev) => !prev);
                }}
                className="absolute right-2 top-3.5">
                <Text variant="footnote" className="text-muted">
                  {showPassword ? 'hide' : 'show'}
                </Text>
              </Pressable>
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
