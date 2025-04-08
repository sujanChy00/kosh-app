import { Contact } from 'expo-contacts';

export interface ContactSheetProps {
  onSelect: ({ name, number }: { name: string; number: string }) => void;
  contacts: Contact[];
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
}
