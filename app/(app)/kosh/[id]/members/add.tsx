import { Stack } from 'expo-router';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { z } from 'zod';

import { PlusIcon } from '~/components/icons/plus-icon';
import { KoshMemberFormSheet } from '~/components/kosh/kosh-member-form-sheet';
import { KoshMemberList } from '~/components/kosh/kosh-member-list';
import { Button } from '~/components/ui/button';
import { Spacer } from '~/components/ui/spacer';
import { Text } from '~/components/ui/text';

const schema = z.object({
  phoneNo: z.string().min(10),
  name: z.string().min(1),
  email: z.string().email().optional(),
  isManager: z.boolean().optional(),
  managerPowers: z.enum(['all', 'withdrawals', 'manage_members']).optional(),
});

const ATouchable = Animated.createAnimatedComponent(TouchableOpacity);

type Member = z.infer<typeof schema>;

const Page = () => {
  const [members, setMembers] = useState<(Member & { id: number })[]>([]);

  const removeMember = (id: number) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };

  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          title: 'Add Member',
          headerRight: () => (
            <View className="flex-row items-center gap-x-3">
              {members.length > 0 && (
                <KoshMemberFormSheet members={members} setMembers={setMembers}>
                  <PlusIcon className="text-foreground" />
                </KoshMemberFormSheet>
              )}
              <ATouchable disabled={members.length === 0}>
                <Text
                  className={`font-medium ${members.length === 0 ? 'text-muted-foreground' : 'text-foreground'}`}>
                  save
                </Text>
              </ATouchable>
            </View>
          ),
        }}
      />

      {members.length > 0 ? (
        <KoshMemberList estimatedItemSize={98} members={members} removeMember={removeMember} />
      ) : (
        <View className="flex-1 items-center justify-center gap-y-3">
          <Text className="text-muted-foreground">No members added yet</Text>
          <KoshMemberFormSheet members={members} setMembers={setMembers} asChild>
            <Button variant="secondary">
              <PlusIcon className="text-secondary-foreground" />
              <Text> Add Member</Text>
            </Button>
          </KoshMemberFormSheet>
        </View>
      )}
      <Spacer height={60} />
    </View>
  );
};

export default Page;
