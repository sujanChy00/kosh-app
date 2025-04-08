import * as AvatarPrimitive from '@rn-primitives/avatar';
import * as React from 'react';

import { Text } from './text';

import { cn } from '~/lib/cn';
import { getAvatarName } from '~/lib/get-avatar-name';

const AvatarWrapper = React.forwardRef<AvatarPrimitive.RootRef, AvatarPrimitive.RootProps>(
  ({ alt, className, ...props }, ref) => {
    return (
      <AvatarPrimitive.Root
        ref={ref}
        alt={alt}
        className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
        {...props}
      />
    );
  }
);

AvatarWrapper.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<AvatarPrimitive.ImageRef, AvatarPrimitive.ImageProps>(
  ({ className, ...props }, ref) => {
    return (
      <AvatarPrimitive.Image
        ref={ref}
        className={cn('aspect-square h-full w-full', className)}
        {...props}
      />
    );
  }
);

AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<AvatarPrimitive.FallbackRef, AvatarPrimitive.FallbackProps>(
  ({ className, ...props }, ref) => {
    return (
      <AvatarPrimitive.Fallback
        ref={ref}
        className={cn(
          'flex h-full w-full items-center justify-center rounded-full bg-muted dark:bg-muted-foreground',
          className
        )}
        {...props}
      />
    );
  }
);

AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

const Avatar = ({
  className,
  alt,
  fallback,
  fallbackClassName,
  src,
}: {
  className?: string;
  alt: string;
  src?: string | null;
  fallback?: string;
  fallbackClassName?: string;
}) => {
  return (
    <AvatarWrapper alt={alt} className={className}>
      {src ? (
        <AvatarImage source={{ uri: src }} />
      ) : (
        <AvatarFallback>
          <Text className={cn('text-muted-foreground dark:text-muted', fallbackClassName)}>
            {getAvatarName(fallback)}
          </Text>
        </AvatarFallback>
      )}
    </AvatarWrapper>
  );
};

export { Avatar, AvatarFallback, AvatarImage };
