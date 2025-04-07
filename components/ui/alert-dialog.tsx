import React, { createContext, useContext, useEffect, useState } from 'react';
import { Modal, Pressable, Text, TextProps, View, ViewProps } from 'react-native';
import Animated, { StretchInY } from 'react-native-reanimated';

import { Button, ButtonProps } from './button';

import { cn } from '~/lib/cn';

interface AlertDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onDismiss?: () => void;
  children: React.ReactNode;
}

type ContextType = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDismiss?: () => void;
  isControlled: boolean;
  forceClose: () => void;
  forceOpen: () => void;
};

const AlertDialogContext = createContext<ContextType | null>(null);

export const AlertDialog = ({
  open: openProp,
  onOpenChange,
  onDismiss,
  children,
}: AlertDialogProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [forceClosed, setForceClosed] = useState(false);
  const [forceOpened, setForceOpened] = useState(false);

  const isControlled = openProp !== undefined;

  let effectiveOpen = openProp;
  if (isControlled && !onOpenChange) {
    if (forceClosed) {
      effectiveOpen = false;
    } else if (forceOpened) {
      effectiveOpen = true;
    }
  }

  const opened = isControlled ? (effectiveOpen ?? false) : uncontrolledOpen;

  useEffect(() => {
    if (openProp !== undefined) {
      setForceClosed(!openProp);
      setForceOpened(openProp);
    }
  }, [openProp]);

  const handleOpenChange = (value: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(value);
    } else if (isControlled && !onOpenChange) {
      if (value) {
        setForceOpened(true);
        setForceClosed(false);
      } else {
        setForceClosed(true);
        setForceOpened(false);
      }
    }

    onOpenChange?.(value);

    if (!value && onDismiss) {
      onDismiss();
    }
  };

  const forceClose = () => {
    if (isControlled && !onOpenChange) {
      setForceClosed(true);
      setForceOpened(false);
    } else {
      handleOpenChange(false);
    }
  };

  const forceOpen = () => {
    if (isControlled && !onOpenChange) {
      setForceOpened(true);
      setForceClosed(false);
    } else {
      handleOpenChange(true);
    }
  };

  return (
    <AlertDialogContext.Provider
      value={{
        onDismiss,
        open: opened,
        onOpenChange: handleOpenChange,
        isControlled,
        forceClose,
        forceOpen,
      }}>
      {children}
    </AlertDialogContext.Provider>
  );
};

export const AlertDialogTrigger = (props: ButtonProps) => {
  const context = useAlertDialog();
  return (
    <Button
      onPress={() => {
        context.forceOpen();
      }}
      {...props}
    />
  );
};

export const AlertDialogHeader = React.forwardRef<View, ViewProps>((props, ref) => {
  return (
    <View ref={ref} {...props} className={cn('flex flex-col space-y-1.5 p-6', props.className)} />
  );
});

export const AlertDialogTitle = React.forwardRef<Text, TextProps>((props, ref) => {
  return (
    <Text
      role="heading"
      aria-level={3}
      ref={ref}
      className={cn(
        'text-2xl font-semibold leading-none tracking-tight text-card-foreground',
        props.className
      )}
      {...props}
    />
  );
});

export const AlertDialogDescription = React.forwardRef<Text, TextProps>((props, ref) => {
  return (
    <Text ref={ref} {...props} className={cn('text-sm text-muted-foreground', props.className)} />
  );
});

export const AlertDialogContent = React.forwardRef<View, ViewProps>((props, ref) => {
  const { open, onDismiss } = useAlertDialog();
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onDismiss={onDismiss}
      statusBarTranslucent>
      <View className="bg-background/80 relative flex-1 items-center justify-center">
        <Animated.View
          entering={StretchInY.duration(200)}
          ref={ref}
          className={cn(
            'shadow-foreground/10 relative z-40 min-w-[80%] max-w-[90%] rounded-3xl bg-card shadow-sm sm:min-w-[30%]',
            props.className
          )}
          {...props}
        />
      </View>
    </Modal>
  );
});

export const AlertDialogFooter = React.forwardRef<View, ViewProps>((props, ref) => {
  return (
    <View
      ref={ref}
      {...props}
      className={cn('flex flex-row items-center justify-end p-6 pt-0', props.className)}
    />
  );
});

export const AlertDialogCancel = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  ({ children, onPress, ...props }, ref) => {
    const { forceClose, isControlled, onOpenChange } = useAlertDialog();

    const handlePress = (e: any) => {
      forceClose();

      onPress?.(e);

      if (isControlled && !onOpenChange) {
        console.warn(
          'AlertDialog is in controlled mode (open={true}) but no onOpenChange handler was provided. ' +
            'Using internal state to force close, but this is not recommended. ' +
            'Always provide an onOpenChange handler with controlled AlertDialogs.'
        );
      }
    };

    return (
      <Button ref={ref} variant="plain" size="sm" {...props} onPress={handlePress}>
        {children}
      </Button>
    );
  }
);

export const AlertDialogAction = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  ({ children, onPress, ...props }, ref) => {
    const { forceClose } = useAlertDialog();

    return (
      <Button
        ref={ref}
        variant="plain"
        size="sm"
        {...props}
        onPress={(e) => {
          onPress?.(e);
          forceClose();
        }}>
        {children}
      </Button>
    );
  }
);

AlertDialogAction.displayName = 'AlertDialogAction';
AlertDialogCancel.displayName = 'AlertDialogCancel';
AlertDialogFooter.displayName = 'AlertDialogFooter';
AlertDialogContent.displayName = 'AlertDialogContent';
AlertDialogTitle.displayName = 'AlertDialogTitle';
AlertDialogDescription.displayName = 'AlertDialogDescription';
AlertDialogHeader.displayName = 'AlertDialogHeader';

const useAlertDialog = () => {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error('AlertDialog components must be used within <AlertDialog />');
  }
  return context;
};
