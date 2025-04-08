import { Ionicons } from '@expo/vector-icons';
import type {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import type { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';
import { View } from 'react-native';
import Animated, { StretchInX, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useColorScheme } from '~/hooks/use-color-scheme';

const { Navigator } = createMaterialTopTabNavigator();

const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const TabLayout = () => {
  const { colors } = useColorScheme();
  const { bottom } = useSafeAreaInsets();
  return (
    <View className="flex-1" style={{ paddingBottom: bottom }}>
      <MaterialTopTabs
        tabBarPosition="bottom"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: colors.background,
            borderTopColor: colors.grey5,
            borderTopWidth: 1,
            borderStyle: 'solid',
          },
          tabBarActiveTintColor: colors.primary,
          tabBarIndicatorStyle: {
            display: 'none',
          },
          tabBarInactiveTintColor: colors.grey4,
        }}>
        <MaterialTopTabs.Screen
          name="index"
          options={{
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
        <MaterialTopTabs.Screen
          name="chat"
          options={{
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
            tabBarBounces: false,
            tabBarLabelStyle: {
              display: 'none',
            },
          }}
        />
        <MaterialTopTabs.Screen
          name="transactions"
          options={{
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
        <MaterialTopTabs.Screen
          name="profile"
          options={{
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
      </MaterialTopTabs>
    </View>
  );
};

export default TabLayout;
