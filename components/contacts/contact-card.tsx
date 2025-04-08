import { Contact } from 'expo-contacts';
import { Pressable, View } from 'react-native';
import * as DropdownMenu from 'zeego/dropdown-menu';

import { Avatar } from '../ui/avatar';
import { Text } from '../ui/text';

import { ChevronDown } from '~/components/icons/chevron-down';
import { truncateString } from '~/lib/truncate-string';

type Props = {
  contact: Contact;
  onSelect: ({ name, number }: { name: string; number: string }) => void;
  onClose: () => void;
};

export const ContactCard = ({ contact, onSelect, onClose }: Props) => {
  return (
    <Pressable
      onPress={() => {
        if (contact.phoneNumbers?.length === 1) {
          onSelect({
            name: contact.name || '',
            number: contact.phoneNumbers[0].number || '',
          });
          onClose();
        }
      }}
      className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-x-2">
        <Avatar
          src={contact.image?.uri || ''}
          alt={contact.name || 'user'}
          fallback={contact.name || 'user'}
          className="size-12"
        />
        <Text className="font-medium capitalize">
          {contact.name ? truncateString(contact.name, 20) : 'No Name'}
        </Text>
      </View>
      <ContactPhoneNumberList onSelect={onSelect} onClose={onClose} contact={contact} />
    </Pressable>
  );
};

const ContactPhoneNumberList = ({ contact, onSelect, onClose }: Props) => {
  const phoneNumbers = contact.phoneNumbers;

  if (!phoneNumbers?.length) return null;
  if (phoneNumbers.length === 1)
    return (
      <Pressable>
        <Text className="text-sm font-medium text-muted-foreground">{phoneNumbers[0].number}</Text>
      </Pressable>
    );

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <View className="flex-row items-center gap-x-1">
          <Text className="text-sm font-medium text-muted-foreground">
            {contact?.phoneNumbers?.[0].number}
          </Text>
          <ChevronDown size={18} className="text-muted-foreground" />
        </View>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {phoneNumbers.map((phone) => (
          <DropdownMenu.Item
            key={phone.number?.toString() || ''}
            onSelect={() => {
              onSelect({
                name: contact.name || '',
                number: phone.number || '',
              });
              onClose();
            }}>
            <DropdownMenu.ItemTitle>{phone.number}</DropdownMenu.ItemTitle>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
