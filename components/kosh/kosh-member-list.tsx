import { LegendList, LegendListProps } from '@legendapp/list';
import { View } from 'react-native';
import { KoshMemberCard } from './kosh-member-card';
import { useCallback } from 'react';

type members = {
  phoneNo: string;
  name: string;
  email?: string;
  id: number;
};

type Props = Omit<LegendListProps<members>, 'data' | 'keyExtractor' | 'renderItem'> & {
  members: members[];
  removeMember: (id: number) => void;
};

export const KoshMemberList = ({ members, removeMember, ...props }: Props) => {
  const itemSeparator = useCallback(() => <View className="h-3" />, []);
  return (
    <LegendList
      {...props}
      estimatedItemSize={98}
      contentContainerStyle={{ padding: 16 }}
      ItemSeparatorComponent={itemSeparator}
      recycleItems
      removeClippedSubviews
      data={members}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <KoshMemberCard {...item} removeMember={removeMember} />}
    />
  );
};
