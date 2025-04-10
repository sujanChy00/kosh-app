import { createContext, useContext, useRef } from 'react';
import RnSwipeable, { SwipeableProps } from 'react-native-gesture-handler/Swipeable';

const SwipeableContext = createContext<{
  onClose: () => void;
}>({
  onClose: () => {},
});

export const Swipeable = ({ children, ...props }: SwipeableProps) => {
  const swipeableRow = useRef<RnSwipeable>(null);
  const onClose = () => {
    swipeableRow.current?.close();
  };
  return (
    <SwipeableContext.Provider value={{ onClose }}>
      <RnSwipeable
        ref={swipeableRow}
        friction={2}
        enableTrackpadTwoFingerGesture
        leftThreshold={30}
        rightThreshold={40}
        {...props}>
        {children}
      </RnSwipeable>
    </SwipeableContext.Provider>
  );
};

export const useSwipeable = () => {
  const context = useContext(SwipeableContext);
  if (!context) {
    throw new Error('useSwipeable must be used within <Swipeable />');
  }
  return context;
};
