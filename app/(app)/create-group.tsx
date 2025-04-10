import { Stack } from 'expo-router';
import { useState } from 'react';
import { Pressable, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { X } from '~/components/icons/close-icon';
import { Badge } from '~/components/ui/badge';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';

const membersList = [
  {
    name: 'John Doe',
    id: 0,
  },
  {
    name: 'Jane Doe',
    id: 1,
  },
  {
    name: 'susan',
    id: 2,
  },
  {
    name: 'ravindra',
    id: 3,
  },
  {
    name: 'dhoni',
    id: 4,
  },
];

const Page = () => {
  const [members, setMembers] = useState<{ name: string; id: number }[]>([]);
  const [groupName, setGroupName] = useState('');
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');
  const filteredMembers = membersList.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <KeyboardAwareScrollView className="flex-1 p-4" keyboardShouldPersistTaps="handled">
      <Stack.Screen
        options={{
          headerTitle: 'Create Group',
          headerRight: () => (
            <Pressable>
              <Text className="font-medium">save</Text>
            </Pressable>
          ),
        }}
      />
      <View className="pb-5 pt-20">
        <Input
          value={groupName}
          onChangeText={setGroupName}
          placeholder="your group name"
          className="rounded-full"
        />
      </View>
      <View className="gap-y-3">
        <View className="flex-row flex-wrap items-stretch rounded-3xl border border-input">
          <View className="flex-row flex-wrap items-center gap-1 p-1">
            {members.map((m) => (
              <Badge key={m.id} className="flex-row justify-between gap-x-2 px-2 py-2.5">
                <Text className="font-medium">{m.name}</Text>
                <Pressable
                  onPress={() => setMembers((prev) => prev.filter((member) => member.id !== m.id))}>
                  <X className="text-background" size={20} />
                </Pressable>
              </Badge>
            ))}
          </View>
          <Input
            onFocus={() => setShow(true)}
            onBlur={() => setShow(false)}
            value={search}
            onChangeText={setSearch}
            placeholder="add members"
            className="w-full rounded-full border-0 py-0"
          />
        </View>
        <View className="gap-y-1">
          {show &&
            filteredMembers.map((m) => (
              <TouchableOpacity
                onPress={() => {
                  if (members.some((member) => member.id === m.id)) {
                    setMembers((prev) => prev.filter((member) => member.id !== m.id));
                  } else {
                    setMembers((prev) => [...prev, m]);
                  }
                }}
                key={m.id}
                className="rounded-md bg-muted p-2">
                <Text>{m.name}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Page;
