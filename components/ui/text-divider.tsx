import { StyleSheet, View } from 'react-native';

export const TextDivider = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className="flex-row items-center justify-between gap-x-2">
      <View
        className="flex-1 border-border"
        style={{
          borderWidth: StyleSheet.hairlineWidth,
        }}
      />
      {children}
      <View
        className="flex-1 border-border"
        style={{
          borderWidth: StyleSheet.hairlineWidth,
        }}
      />
    </View>
  );
};
