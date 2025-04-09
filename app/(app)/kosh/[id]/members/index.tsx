import { LegendList } from '@legendapp/list';
import { Link, Stack } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { KoshMemberCard } from '~/components/kosh/kosh-member-card';
import { Button } from '~/components/ui/button';
import { PlusIcon } from '~/components/icons/plus-icon';
import { UsersRound } from '~/components/icons/users-round';
import { Text } from '~/components/ui/text';
import { Spacer } from '~/components/ui/spacer';

type Props = {
  phoneNo: string;
  name: string;
  email?: string;
  id: number;
};

const Page = () => {
  const [members, setMembers] = useState(
    Array.from({ length: 40 }).map((_, i) => ({
      name: `Member ${i + 1}`,
      phoneNo: `+1-${Math.floor(Math.random() * 1000000000)}`,
      email: `member${i + 1}@example.com`,
      id: i,
    }))
  );
  const data: Props[] = useMemo(() => members, [members]);

  const ItemSeparatorComponent = useCallback(() => <View className="h-3" />, []);

  const removeMember = (id: number) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };

  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          headerTitle: 'Kosh Members',
          headerRight: () => (
            <Link href={'/kosh/1/members/add'} className="font-medium text-foreground">
              add
            </Link>
          ),
        }}
      />
      {/* <View className="flex-1 justify-center gap-y-3">
        <View className="items-center">
          <UsersRound className="text-muted-foreground" size={50} />
        </View>
        <Link asChild href={'/kosh/1/members/add'}>
          <Button variant="secondary">
            <PlusIcon className="text-secondary-foreground" />
            <Text className="text-secondary-foreground">Add</Text>
          </Button>
        </Link>
      </View> */}
      <LegendList
        data={data}
        estimatedItemSize={114}
        recycleItems
        ItemSeparatorComponent={ItemSeparatorComponent}
        maintainVisibleContentPosition
        contentContainerStyle={{ padding: 16 }}
        ListFooterComponent={<Spacer height={60} />}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <KoshMemberCard {...item} removeMember={removeMember} />}
      />
    </View>
  );
};

export default Page;
