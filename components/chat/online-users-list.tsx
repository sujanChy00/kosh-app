import { FlatList, View } from 'react-native';
import { Avatar } from '../ui/avatar';
import React, { useMemo } from 'react';

export const OnLineUsersList = () => {
  const data = useMemo(() => Array.from({ length: 40 }).map((_, i) => i), []);
  return (
    <FlatList
      horizontal
      style={{
        paddingBottom: 20,
      }}
      contentContainerClassName="gap-3"
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => item.toString()}
      renderItem={() => <UserList />}
    />
  );
};

const UserList = React.memo(() => {
  return (
    <View className="relative size-[60px]">
      <Avatar
        alt="user"
        fallback="user"
        className="size-full"
        src={
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }
      />
      <View className="absolute bottom-0 right-0 size-4 rounded-full bg-green-500" />
    </View>
  );
});
