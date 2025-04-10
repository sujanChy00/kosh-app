import { formatDistanceToNow } from 'date-fns';
import React, { useMemo } from 'react';
import { View } from 'react-native';

import { Avatar } from '../ui/avatar';
import { Card } from '../ui/card';
import { Text } from '../ui/text';

import { cn } from '~/lib/cn';

export const ChatMessage = React.memo(
  ({
    isUser,
    text,
    timestamp = Date.now() - 86400000,
  }: {
    text: string;
    isUser: boolean;
    timestamp?: number;
  }) => {
    const formattedTime = useMemo(
      () => formatDistanceToNow(new Date(timestamp), { addSuffix: true }),
      [timestamp]
    );

    const containerClassName = useMemo(
      () => cn('items-center gap-x-2', isUser ? 'ml-auto flex-row-reverse' : 'mr-auto flex-row'),
      [isUser]
    );

    return (
      <View className={containerClassName}>
        <Avatar alt="user" fallback="user" className="size-8" />
        <View className="max-w-[85%]">
          <Card
            className={cn('gap-y-0.5 rounded-3xl border-0 p-2 shadow-none', {
              'bg-primary': isUser,
              'bg-card': !isUser,
            })}>
            <Text className={cn('text-sm', isUser ? 'text-right text-white' : 'text-left')}>
              {text}
            </Text>
          </Card>
          <Text
            variant="caption2"
            className={cn(
              'italic ',
              isUser ? 'text-right text-muted' : 'text-left text-muted-foreground'
            )}>
            {formattedTime}
          </Text>
        </View>
      </View>
    );
  }
);

ChatMessage.displayName = 'ChatMessage';
