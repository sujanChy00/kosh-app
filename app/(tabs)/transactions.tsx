import { LegendList } from '@legendapp/list';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';

const Transactions = () => {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <LegendList
      contentContainerStyle={{ paddingHorizontal: 16, paddingTop: top, paddingBottom: bottom }}
      style={{
        flex: 1,
      }}
      recycleItems
      waitForInitialLayout
      keyExtractor={(item) => item.toString()}
      estimatedItemSize={20}
      ItemSeparatorComponent={() => <View className="h-3" />}
      data={Array.from({ length: 100 }).map((_, index) => index)}
      renderItem={({ item }) => (
        <Card className="rounded-2xl p-3">
          <CardHeader className="gap-y-1 p-0">
            <CardTitle>Withdrawal</CardTitle>
            <CardDescription>You have withdrawn Rs. 2,000 from Chhatapipra Kosh</CardDescription>
          </CardHeader>
          <CardContent className="p-0" />
        </Card>
      )}
    />
  );
};

export default Transactions;
