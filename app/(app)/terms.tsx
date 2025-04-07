import { View } from 'react-native';

import { Text } from '~/components/ui/text';
import { useHeaderSearchBar } from '~/hooks/use-header-searchbar';

const TermsScreen = () => {
  const search = useHeaderSearchBar({});
  return (
    <View>
      <Text>TermsScreen</Text>
    </View>
  );
};

export default TermsScreen;
