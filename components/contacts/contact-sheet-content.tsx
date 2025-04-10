import { BottomSheetView } from '@gorhom/bottom-sheet';
import { useState } from 'react';
import { View } from 'react-native';

import { Input } from '../ui/input';
import { ContactList } from './contact-list';
import { ContactSheetProps } from './types';

import { Search } from '~/components/icons/search-icon';

export const ContactSheetContent = (props: ContactSheetProps) => {
  const [text, setText] = useState('');
  return (
    <BottomSheetView className="flex-1 gap-y-6">
      <View className="p-3">
        <View className="flex-row items-center gap-x-1 overflow-hidden rounded-full border border-input bg-background pl-3">
          <Search className="text-muted-foreground" />
          <Input
            value={text}
            onChangeText={setText}
            placeholder="search contacts"
            className="flex-1 border-0 bg-transparent shadow-none"
            inputMode="search"
          />
        </View>
      </View>
      <ContactList filter={text} {...props} />
    </BottomSheetView>
  );
};
