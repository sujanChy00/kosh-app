import { View, ViewProps } from 'react-native';

import { cn } from '~/lib/cn';

interface Props extends ViewProps {
  width: number;
}

export const SwipeableActionRenderer = ({ width, ...props }: Props) => {
  return (
    <View {...props} className={cn('flex-row', props.className)} style={[props.style, { width }]} />
  );
};
