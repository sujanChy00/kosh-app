import { Animated } from 'react-native';

import { SwipeableAction } from '../ui/swipeable/swipeable-action';
import { SwipeableActionRenderer } from '../ui/swipeable/swipeable-action-renderer';

import { CheckCheck } from '~/components/icons/check-check';
import { Trash2 } from '~/components/icons/trash-icon2';

interface Props {
  prog: Animated.AnimatedInterpolation<number>;
  onDelete: () => void;
}

export function ChatcardActions({ prog, onDelete }: Props) {
  return (
    <SwipeableActionRenderer width={128}>
      <SwipeableAction
        onPress={() => {
          console.log('pressed');
        }}
        className="bg-secondary"
        width={128}
        progress={prog}>
        <CheckCheck className="text-white dark:text-secondary-foreground" size={28} />
      </SwipeableAction>
      <SwipeableAction
        onPress={() => {
          onDelete();
        }}
        className="bg-destructive"
        width={64}
        progress={prog}>
        <Trash2 className="text-destructive-foreground" size={28} />
      </SwipeableAction>
    </SwipeableActionRenderer>
  );
}
