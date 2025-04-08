import * as Contacts from 'expo-contacts';
import { useEffect, useState } from 'react';

import { Button, ButtonProps } from '../ui/button';
import { Sheet, useSheetRef } from '../ui/sheet';
import { ContactSheetContent } from './contact-sheet-content';

import { SquareUserRoundIcon } from '~/components/icons/square-user-round';

type Props = ButtonProps & {
  onSelect: ({ name, number }: { name: string; number: string }) => void;
};

export const ContactsSheet = ({ onSelect, children, ...props }: Props) => {
  const ref = useSheetRef();
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers, Contacts.Fields.Image],
          });

          if (data.length > 0) {
            const formattedContacts: Contacts.Contact[] = data.map((contact) => ({
              ...contact,
              id: contact.id,
              name: contact.name || 'No Name',
              phoneNumbers: contact.phoneNumbers,
            }));
            setContacts(formattedContacts);
          }
        } else {
          setError('Permission to access contacts was denied');
        }
      } catch (err) {
        setError('Error loading contacts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <>
      <Button variant="muted" size="icon" {...props} onPress={() => ref.current?.present()}>
        {children || <SquareUserRoundIcon className="text-muted-foreground" />}
      </Button>
      <Sheet ref={ref} snapPoints={[220, 500, 800]}>
        <ContactSheetContent
          contacts={contacts}
          onSelect={onSelect}
          isLoading={loading}
          onClose={() => ref.current?.dismiss()}
          error={error}
        />
      </Sheet>
    </>
  );
};
