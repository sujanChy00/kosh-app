import { useRouter } from 'expo-router';
import * as DropdownMenu from 'zeego/dropdown-menu';

import { Ellipsis } from '~/components/icons/ellipsis';
import { useActionSheet } from '~/hooks/use-action-sheet';

export const KoshOptions = () => {
  const router = useRouter();
  const { showActionSheet } = useActionSheet({
    options: ['Delete', 'Cancel'],
    cancelButtonIndex: 1,
    destructiveButtonIndex: 0,
    message: 'Are you sure you want to delete this kosh?',
  });
  const onPress = () => {
    showActionSheet((index) => {
      switch (index) {
        case 0:
          console.log('Delete');
          break;
        case 1:
          console.log('Cancel');
          break;
        default:
          break;
      }
    });
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Ellipsis size={20} className="text-foreground" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onSelect={() => router.push('/kosh/3/edit')} key="edit">
          <DropdownMenu.ItemTitle>Edit</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => router.push('/kosh/3/add-member')} key="add_member">
          <DropdownMenu.ItemTitle>Add Members</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
        <DropdownMenu.Item
          onSelect={() => {
            router.push('/kosh/3/add-manager');
          }}
          key="add_manager">
          <DropdownMenu.ItemTitle>Add Managers</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
        <DropdownMenu.Item key="delete" destructive onSelect={onPress}>
          <DropdownMenu.ItemTitle>Delete</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
