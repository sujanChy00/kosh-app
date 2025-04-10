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

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 60;

type Props = {
  scrollOffset: SharedValue<number>;
  paddingTop: SharedValue<number>;
};

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export const ChatAnimatedHeader = ({ scrollOffset, paddingTop }: Props) => {
  const [searchText, setSearchText] = useState('');
  const { isDarkColorScheme } = useColorScheme();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { top } = useSafeAreaInsets();
  const isCollapsed = useSharedValue(false);

  const animatedTextStyle = useAnimatedStyle(() => {
    const clampedOffset = clamp(scrollOffset.value, 0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT);
    return {
      fontSize: interpolate(
        clampedOffset,
        [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
        [36, 20],
        'clamp'
      ),
    };
  });

  const blurViewAnimatedStyle = useAnimatedStyle(() => {
    if (isCollapsed.value) {
      return {
        height: withTiming(HEADER_MIN_HEIGHT + top),
      };
    }

    const clampedOffset = clamp(scrollOffset.value, 0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT);
    return {
      height: interpolate(
        clampedOffset,
        [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
        [HEADER_MAX_HEIGHT + top, HEADER_MIN_HEIGHT + top],
        'clamp'
      ),
    };
  });

  const handleSearchPress = (value: boolean) => {
    setIsSearchVisible(value);
    isCollapsed.value = value;
    paddingTop.value = value ? HEADER_MIN_HEIGHT : HEADER_MAX_HEIGHT;
  };

  return (
    <AnimatedBlurView
      style={[
        blurViewAnimatedStyle,
        {
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: 20,
          width: '100%',
          backgroundColor: isDarkColorScheme ? '#000000cc' : '#f7f7f733',
        },
      ]}
      intensity={100}
      tint={isDarkColorScheme ? 'dark' : 'light'}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          justifyContent: 'flex-end',
          paddingBottom: 16,
        }}>
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
              <TouchableOpacity onPress={() => handleSearchPress(false)}>
                <Text variant="caption1">cancel</Text>
              </TouchableOpacity>
            </Animated.View>
          ) : (
            <TouchableOpacity onPress={() => handleSearchPress(true)}>
              <Search size={22} className="text-muted-foreground" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </AnimatedBlurView>
  );
};
