import { View } from 'react-native';

export const Spacer = ({ height = 20 }: { height?: number }) => {
  return (
    <View
      style={{
        height,
      }}
    />
  );
};
