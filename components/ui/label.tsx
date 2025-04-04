import React from 'react';
import { Text, TextProps } from 'react-native';

import { cn } from '~/lib/cn';

export const Label = React.forwardRef<Text, TextProps>((props, ref) => {
  return (
    <Text
      ref={ref}
      {...props}
      className={cn(
        'native:text-base text-sm font-medium leading-none text-foreground web:peer-disabled:cursor-not-allowed web:peer-disabled:opacity-70',
        props.className
      )}
    />
  );
});
