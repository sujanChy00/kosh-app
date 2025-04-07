import {
  ActionSheetOptions,
  useActionSheet as useNativeActionSheet,
} from '@expo/react-native-action-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useColorScheme } from '~/hooks/use-color-scheme';

export const useActionSheet = (props: ActionSheetOptions) => {
  const { colors } = useColorScheme();
  const { bottom } = useSafeAreaInsets();
  const { showActionSheetWithOptions } = useNativeActionSheet();
  const showActionSheet = (onOptionSelected: (index?: number) => void) => {
    showActionSheetWithOptions(
      {
        containerStyle: {
          paddingBottom: bottom,
          backgroundColor: colors.card,
        },
        messageTextStyle: {
          color: colors.foreground,
        },
        cancelButtonTintColor: colors.muted_foreground,
        ...props,
      },
      onOptionSelected
    );
  };
  return { showActionSheet };
};
