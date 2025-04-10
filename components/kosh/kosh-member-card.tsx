import { Linking, Pressable, View } from 'react-native';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Separator } from '../ui/separator';
import { Text } from '../ui/text';

import { cn } from '~/lib/cn';

type Props = {
  phoneNo: string;
  name: string;
  email?: string;
  isManager?: boolean;
  managerPowers?: string;
  id: number;
  removeMember: (id: number) => void;
  className?: string;
};

export const KoshMemberCard = ({
  name,
  phoneNo,
  email,
  isManager,
  managerPowers,
  id,
  removeMember,
  className,
}: Props) => {
  return (
    <Card className={cn('relative overflow-hidden rounded-2xl border-0', className)}>
      <View className="flex-row items-start justify-between p-3">
        <Text className="flex-1 text-lg font-medium capitalize">{name}</Text>

        <View className="items-end gap-y-1">
          <Pressable
            onPress={() => {
              Linking.openURL(`tel:${phoneNo}`);
            }}>
            <Text className="text-sm text-muted-foreground">{phoneNo}, </Text>
          </Pressable>
          {!!email && (
            <Pressable onPress={() => Linking.openURL(`mailto:${email}`)}>
              <Text className="text-sm text-muted-foreground">{email}</Text>
            </Pressable>
          )}
        </View>
      </View>
      {isManager && (
        <View className="flex-row items-center justify-between bg-muted p-3 dark:bg-muted-foreground">
          <Badge>
            <Text>manager</Text>
          </Badge>
          <View className="flex-row items-center gap-x-1">
            <Text className="text-sm ">Powers: </Text>
            <Badge className="bg-destructive/60">
              <Text>{managerPowers}</Text>
            </Badge>
          </View>
        </View>
      )}
      <Separator style={{ height: 1 }} />
      <Button variant="plain" size="flat" onPress={() => removeMember(id)}>
        <Text className="text-destructive">Remove</Text>
      </Button>
    </Card>
  );
};
