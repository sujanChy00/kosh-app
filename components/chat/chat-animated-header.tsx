import { BlurView } from 'expo-blur';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, {
  clamp,
  FadeIn,
  FadeOut,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Search } from '~/components/icons/search-icon';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { useColorScheme } from '~/hooks/use-color-scheme';

// use fixed header height instead of calculating it on the fly

type Props = {
  scrollOffset: SharedValue<number>;
  setHeaderHeight: (height: number) => void;
  headerHeight: number;
};

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export const ChatAnimatedHeader = ({ scrollOffset, headerHeight, setHeaderHeight }: Props) => {
  const [searchText, setSearchText] = useState('');
  const { isDarkColorScheme } = useColorScheme();
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const { top } = useSafeAreaInsets();
  const isCollapsed = useSharedValue(false);

  const animatedTextStyle = useAnimatedStyle(() => {
    const clampedOffset = clamp(scrollOffset.value, 0, headerHeight);
    return {
      fontSize: interpolate(clampedOffset, [0, headerHeight], [36, 20], 'clamp'),
    };
  });

  const blurViewAnimatedStyle = useAnimatedStyle(() => {
    const clampedOffset = clamp(scrollOffset.value, 0, headerHeight);
    return {
      paddingTop: isCollapsed.value
        ? withTiming(top + 20)
        : interpolate(clampedOffset, [0, headerHeight], [top + 60, top + 20], 'clamp'),
      paddingBottom: isCollapsed.value
        ? withTiming(24)
        : interpolate(clampedOffset, [0, headerHeight], [32, 24], 'clamp'),
    };
  });

  const handleSearchPress = (value: boolean) => {
    setIsSearchVisible(value);
    isCollapsed.value = value;
  };
  return (
    <AnimatedBlurView
      onLayout={(e) => {
        const { height } = e.nativeEvent.layout;
        setHeaderHeight(height);
      }}
      style={[
        blurViewAnimatedStyle,
        {
          backgroundColor: isDarkColorScheme ? '#000000cc' : '#f7f7f733',
        },
      ]}
      intensity={80}
      tint={isDarkColorScheme ? 'dark' : 'light'}
      className="absolute left-0 top-0 z-20 w-full px-6">
      <View className="flex-row items-center justify-between">
        {!isSearchVisible && (
          <Animated.Text
            entering={FadeIn}
            exiting={FadeOut}
            className="font-medium text-foreground"
            style={[animatedTextStyle]}>
            Messages
          </Animated.Text>
        )}

        {isSearchVisible ? (
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            className="flex-1 flex-row items-center rounded-full bg-muted px-2 pr-3 dark:bg-gray-800">
            <Search size={20} className="text-muted-foreground" />
            <Input
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search messages..."
              className="flex-1 border-0 bg-transparent placeholder:text-muted-foreground"
              autoFocus
              inputMode="search"
              keyboardType="web-search"
              returnKeyType="search"
              onSubmitEditing={() => {
                console.log('submitted', searchText);
              }}
            />
            <TouchableOpacity
              onPress={() => {
                handleSearchPress(false);
              }}>
              <Text variant="caption1">cancel</Text>
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <TouchableOpacity onPress={() => handleSearchPress(true)}>
            <Search size={22} className="text-muted-foreground" />
          </TouchableOpacity>
        )}
      </View>
    </AnimatedBlurView>
  );
};
