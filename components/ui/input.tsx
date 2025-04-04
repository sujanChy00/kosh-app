import * as React from 'react';
import { TextInput, type TextInputProps } from 'react-native';

import { cn } from '~/lib/cn';

const Input = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  TextInputProps & { isError?: boolean }
>(({ className, placeholderClassName, isError, ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      className={cn(
        'native:h-12 native:text-lg native:leading-[1.25] ios:bg-white ios:rounded-none ios:dark:bg-neutral-900 ios:border-0 ios:border-transparent h-10 rounded-md border border-input bg-background px-3 text-foreground file:border-0 file:bg-transparent file:font-medium placeholder:text-sm placeholder:text-muted-foreground  web:flex web:w-full web:py-2 web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 lg:text-sm',
        props.editable === false && 'opacity-50 web:cursor-not-allowed',
        isError && 'border-red-500',
        className
      )}
      placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export { Input };
