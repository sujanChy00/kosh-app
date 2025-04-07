import { Picker as RNPicker } from '@react-native-picker/picker';
import { View } from 'react-native';

import { useColorScheme } from '~/hooks/use-color-scheme';
import { cn } from '~/lib/cn';

export function Picker<T>({
  mode = 'dropdown',
  style,
  dropdownIconColor,
  dropdownIconRippleColor,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RNPicker<T>>) {
  const { colors } = useColorScheme();
  return (
    <View
      className={cn(
        'ios:shadow-sm ios:shadow-black/5 overflow-hidden rounded-md border border-input bg-background',
        className
      )}>
      <RNPicker
        mode={mode}
        style={
          style ?? {
            backgroundColor: colors.background,
            borderRadius: 8,
          }
        }
        dropdownIconColor={dropdownIconColor ?? colors.foreground}
        dropdownIconRippleColor={dropdownIconRippleColor ?? colors.foreground}
        {...props}
      />
    </View>
  );
}

export const PickerItem = RNPicker.Item;
