import { LegendList } from '@legendapp/list';
import { View } from 'react-native';

import { Text } from '../ui/text';
import { ContactCard } from './contact-card';
import { ContactSheetProps } from './types';

interface Props extends ContactSheetProps {
  filter: string;
}

export const ContactList = ({ contacts, error, isLoading, onSelect, onClose, filter }: Props) => {
  const filteredContacts = contacts.filter((contact) => {
    const searchTerm = filter.toLowerCase().trim();
    if (!searchTerm) return true;

    const contactName = contact.name?.toLowerCase() || '';
    const contactPhones =
      contact.phoneNumbers?.map((phone) => phone.number?.replace(/\D/g, '')) || [];

    return (
      contactName.includes(searchTerm) || contactPhones.some((phone) => phone?.includes(searchTerm))
    );
  });

  if (isLoading)
    return (
      <View className="items-center justify-center py-10">
        <Text>Loading contacts...</Text>
      </View>
    );

  if (error)
    return (
      <View className="items-center justify-center py-10">
        <Text className="text-destructive">{error}</Text>
      </View>
    );

  return (
    <LegendList
      contentContainerStyle={{ paddingHorizontal: 16 }}
      ItemSeparatorComponent={() => <View className="h-6" />}
      data={filteredContacts}
      renderItem={({ item }) => (
        <ContactCard contact={item} onSelect={onSelect} onClose={onClose} />
      )}
      recycleItems
      ListEmptyComponent={() => (
        <View className="items-center justify-center py-10">
          <Text className="text-muted-foreground">No contacts found</Text>
        </View>
      )}
      waitForInitialLayout
      estimatedItemSize={50}
      keyExtractor={(item) => item.id?.toString() || ''}
    />
  );
};
