import * as Contacts from 'expo-contacts';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ActivityIndicator } from '~/components/ui/activity-indicator';

export default function Screen() {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
          });

          if (data.length > 0) {
            const formattedContacts = data.map((contact) => ({
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
  // const getContacts = async () => {
  //   try {
  //     const { status: existingStatus } = await Contacts.getPermissionsAsync();

  //     let finalStatus = existingStatus;

  //     // Only ask if permissions haven't been determined yet
  //     if (existingStatus === Contacts.PermissionStatus.UNDETERMINED) {
  //       const { status } = await Contacts.requestPermissionsAsync();
  //       finalStatus = status;
  //     }

  //     if (finalStatus === Contacts.PermissionStatus.GRANTED) {
  //       const { data } = await Contacts.getContactsAsync({
  //         fields: [Contacts.Fields.PhoneNumbers],
  //       });
  //       if (data.length > 0) {
  //         setContacts(data);
  //       }
  //     } else if (finalStatus === Contacts.PermissionStatus.DENIED) {
  //       Alert.alert(
  //         'Permission Required',
  //         'Please enable contacts access in your device settings to use this feature.',
  //         [
  //           { text: 'Cancel', style: 'cancel' },
  //           { text: 'Open Settings', onPress: () => Linking.openSettings() },
  //         ]
  //       );
  //     }
  //   } catch (error) {
  //     console.error('Error getting contacts:', error);
  //   }
  // };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id?.toString() || ''}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.contactItem}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>{item.name.charAt(0).toUpperCase()}</Text>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.name}>{item.name}</Text>
              {item.phoneNumbers && item.phoneNumbers[0] && (
                <Text style={styles.phone}>{item.phoneNumbers[0].number}</Text>
              )}
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contactItem: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  contactInfo: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  phone: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ccc',
    marginLeft: 66,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    margin: 20,
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    margin: 20,
  },
});
