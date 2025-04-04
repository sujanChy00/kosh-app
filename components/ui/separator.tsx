import * as React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { cn } from '~/lib/cn';

const Separator = React.forwardRef<View, ViewProps & { orientation?: 'horizontal' | 'vertical' }>(
  ({ className, orientation = 'horizontal', ...props }, ref) => (
    <View
      ref={ref}
      className={cn('shrink-0 bg-border', className)}
      {...props}
      style={[
        {
          height: orientation === 'horizontal' ? StyleSheet.hairlineWidth : '100%',
          width: orientation === 'horizontal' ? '100%' : StyleSheet.hairlineWidth,
        },
        props.style,
      ]}
    />
  )
);
Separator.displayName = 'Separator';

export { Separator };
