import { cva, type VariantProps } from 'class-variance-authority';
import { type LucideIcon } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, TextProps, View, type ViewProps } from 'react-native';
import { Text } from 'react-native-reanimated/lib/typescript/Animated';

import { X } from '../icons/close-icon';

import { useColorScheme } from '~/hooks/use-color-scheme';
import { cn } from '~/lib/cn';

const alertVariants = cva('relative w-full rounded-lg border px-4 py-3', {
  variants: {
    variant: {
      default: 'bg-primary/10 dark:bg-primary/20',
      destructive: 'bg-red-100 dark:bg-red-900/30',
      warning: 'bg-yellow-100 dark:bg-yellow-900/30',
      success: 'bg-green-100 dark:bg-green-900/30',
      secondary: 'bg-gray-100 dark:bg-gray-900/30',
      info: 'bg-blue-100 dark:bg-blue-900/30',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const alertTitleVariants = cva('mb-1 text-base font-medium leading-none tracking-tight', {
  variants: {
    variant: {
      default: 'text-primary dark:text-primary/90',
      destructive: 'text-red-700 dark:text-red-300/90',
      warning: 'text-yellow-700 dark:text-yellow-300/90',
      success: 'text-green-700 dark:text-green-300/90',
      secondary: 'text-gray-700 dark:text-gray-300/90',
      info: 'text-blue-700 dark:text-blue-300/90',
    },
    hasIcon: {
      true: 'pl-7',
      false: 'pl-0',
    },
    hasCloseButton: {
      true: 'pr-7',
      false: 'pr-0',
    },
  },
  defaultVariants: {
    variant: 'default',
    hasIcon: false,
    hasCloseButton: false,
  },
});

const alertDescriptionVariants = cva('text-sm leading-relaxed', {
  variants: {
    variant: {
      default: 'text-primary/90 dark:text-primary/80',
      destructive: 'text-red-700/90 dark:text-red-300/80',
      warning: 'text-yellow-700/90 dark:text-yellow-300/80',
      success: 'text-green-700/90 dark:text-green-300/80',
      secondary: 'text-gray-700/90 dark:text-gray-300/80',
      info: 'text-blue-700/90 dark:text-blue-300/80',
    },
    hasIcon: {
      true: 'pl-7',
      false: 'pl-0',
    },
    hasCloseButton: {
      true: 'pr-7',
      false: 'pr-0',
    },
  },
  defaultVariants: {
    variant: 'default',
    hasIcon: false,
    hasCloseButton: false,
  },
});

type AlertContextValue = {
  variant: NonNullable<VariantProps<typeof alertVariants>['variant']>;
  hasIcon: boolean;
  hasCloseButton: boolean;
} | null;

const AlertContext = React.createContext<AlertContextValue>(null);

const useAlert = () => {
  const context = React.useContext(AlertContext);
  if (!context) {
    throw new Error('Alert compound components cannot be rendered outside the Alert component');
  }
  return context;
};

const Alert = React.forwardRef<
  React.ElementRef<typeof View>,
  ViewProps &
    VariantProps<typeof alertVariants> & {
      icon?: LucideIcon;
      iconSize?: number;
      iconClassName?: string;
      onClose?: () => void;
    }
>(
  (
    {
      className,
      variant = 'default',
      children,
      icon: Icon,
      iconSize = 16,
      iconClassName,
      onClose,
      ...props
    },
    ref
  ) => {
    const { isDarkColorScheme } = useColorScheme();

    const iconColor = () => {
      switch (variant) {
        case 'destructive':
          return isDarkColorScheme ? '#ffcbca' : '#c10007';
        case 'warning':
          return isDarkColorScheme ? 'ffdf20e6' : '#a65f00';
        case 'info':
          return isDarkColorScheme ? '#1447e6e6' : '#1447e6';
        case 'secondary':
          return isDarkColorScheme ? '#364153e6' : '#364153';
        case 'success':
          return isDarkColorScheme ? '#008236e6' : '#008236';
        default:
          return isDarkColorScheme ? '#007bfee6' : '#007bfe';
      }
    };
    return (
      <AlertContext.Provider
        value={{
          variant: variant as NonNullable<typeof variant>,
          hasIcon: !!Icon,
          hasCloseButton: !!onClose,
        }}>
        <View
          ref={ref}
          role="alert"
          className={cn(alertVariants({ variant, className }))}
          {...props}>
          <View className="absolute left-4 top-3.5">
            {Icon && <Icon size={iconSize} className={iconClassName} color={iconColor()} />}
          </View>
          {onClose && (
            <Pressable
              onPress={onClose}
              className="absolute right-4 top-3.5 z-40"
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <X
                size={16}
                className={cn({
                  'dark:text-primary/90 text-primary': variant === 'default',
                  'text-red-700 dark:text-red-300/90': variant === 'destructive',
                  'text-yellow-700 dark:text-yellow-300/90': variant === 'warning',
                  'text-green-700 dark:text-green-300/90': variant === 'success',
                  'text-gray-700 dark:text-gray-300/90': variant === 'secondary',
                  'text-blue-700 dark:text-blue-300/90': variant === 'info',
                })}
              />
            </Pressable>
          )}
          {children}
        </View>
      </AlertContext.Provider>
    );
  }
);
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => {
  const { variant, hasIcon, hasCloseButton } = useAlert();
  return (
    <Text
      ref={ref}
      className={cn(alertTitleVariants({ variant, hasIcon, hasCloseButton, className }))}
      {...props}
    />
  );
});
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<Text, TextProps>(({ className, ...props }, ref) => {
  const { variant, hasIcon, hasCloseButton } = useAlert();
  return (
    <Text
      ref={ref}
      className={cn(alertDescriptionVariants({ variant, hasIcon, hasCloseButton, className }))}
      {...props}
    />
  );
});
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertDescription, AlertTitle };
