import * as React from 'react';
import { TextInput, type TextInputProps } from 'react-native';

import { cn } from '~/lib/cn';

const Textarea = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  TextInputProps & { isError?: boolean }
>(
  (
    { className, multiline = true, numberOfLines = 4, placeholderClassName, isError, ...props },
    ref
  ) => {
    return (
      <TextInput
        ref={ref}
        className={cn(
          'native:text-lg native:leading-[1.25] min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-sm placeholder:text-muted-foreground web:flex web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 lg:text-sm',
          props.editable === false && 'opacity-50 web:cursor-not-allowed',
          isError && 'border-red-500',
          className
        )}
        placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical="top"
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
