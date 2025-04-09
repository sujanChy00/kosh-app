import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View } from 'react-native';
import Animated, { StretchInX, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useColorScheme } from '~/hooks/use-color-scheme';

const TabLayout = () => {
  const { colors } = useColorScheme();
  const { bottom } = useSafeAreaInsets();
  return (
    <Tabs
      // tabBarPosition="bottom"
      screenOptions={{
        animation: 'shift',

        tabBarStyle: {
          backgroundColor: colors.background,
          paddingBottom: bottom,
        },
        tabBarActiveTintColor: colors.primary,
        // tabBarIndicatorStyle: {
        //   display: 'none',
        // },
        tabBarInactiveTintColor: colors.grey4,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          headerTransparent: true,
          tabBarIcon: ({ color, focused }) => (
            <View className="relative items-center">
              <Ionicons
                name="home-outline"
                size={28}
                color={color}
                style={{
                  position: 'relative',
                  zIndex: 30,
                }}
              />
              {focused && (
                <Animated.View
                  entering={StretchInX.easing(withTiming).delay(100)}
                  className="absolute -top-1 -z-10 h-9 w-14 rounded-2xl bg-secondary"
                />
              )}
            </View>
          ),
          tabBarLabelStyle: {
            display: 'none',
          },
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          headerShown: false,
          headerTransparent: true,
          tabBarIcon: ({ color, focused }) => (
            <View className="relative items-center">
              <Ionicons
                name="chatbubble-outline"
                size={28}
                color={color}
                style={{
                  position: 'relative',
                  zIndex: 30,
                }}
              />
              {focused && (
                <Animated.View
                  entering={StretchInX.easing(withTiming).delay(100)}
                  className="absolute -top-1 -z-10 h-9 w-14 rounded-2xl bg-secondary"
                />
              )}
            </View>
          ),
          tabBarLabelStyle: {
            display: 'none',
          },
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          headerShown: false,
          headerTransparent: true,
          tabBarIcon: ({ color, focused }) => (
            <View className="relative items-center">
              <Ionicons
                name="receipt-outline"
                size={28}
                color={color}
                style={{
                  position: 'relative',
                  zIndex: 30,
                }}
              />
              {focused && (
                <Animated.View
                  entering={StretchInX.easing(withTiming).delay(100)}
                  className="absolute -top-1 -z-10 h-9 w-14 rounded-2xl bg-secondary"
                />
              )}
            </View>
          ),
          tabBarLabelStyle: {
            display: 'none',
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          headerTransparent: true,
          tabBarIcon: ({ color, focused }) => (
            <View className="relative items-center">
              <Ionicons
                name="person-outline"
                size={28}
                color={color}
                style={{
                  position: 'relative',
                  zIndex: 30,
                }}
              />
              {focused && (
                <Animated.View
                  entering={StretchInX.easing(withTiming).delay(100)}
                  className="absolute -top-1 -z-10 h-9 w-14 rounded-2xl bg-secondary"
                />
              )}
            </View>
          ),
          tabBarLabelStyle: {
            display: 'none',
          },
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
