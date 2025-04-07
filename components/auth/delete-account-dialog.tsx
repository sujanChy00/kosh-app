import { useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { Input } from '../ui/input';
import { Text } from '../ui/text';

import { ChevronRight } from '~/components/icons/chevron-right';
import { Trash } from '~/components/icons/trash-icon';

export const DeleteAccountDialog = () => {
  const [opened, setOpened] = useState(false);
  const [password, setPassword] = useState('');
  const disabled = password.replaceAll(' ', '').length === 0;
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            'WARNING',
            "Are you sure you want to delete your account? This action can't be undone.",
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Delete',
                style: 'destructive',
                onPress: () => setOpened(true),
              },
            ]
          );
        }}
        className="p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-x-2">
            <Trash className="text-destructive" />
            <Text className="font-medium text-destructive">Delete Account</Text>
          </View>
          <ChevronRight size={22} className="text-destructive" />
        </View>
      </TouchableOpacity>
      <AlertDialog open={opened} onOpenChange={setOpened}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete your account ?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete your account? This action can't be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <View className="p-6 pt-0">
            <Input
              autoFocus
              value={password}
              onChangeText={setPassword}
              placeholder="enter your password"
              className="border-0"
              secureTextEntry
            />
          </View>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <Text>Cancel</Text>
            </AlertDialogCancel>
            <AlertDialogAction disabled={disabled}>
              <Text className="text-destructive">Delete</Text>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
