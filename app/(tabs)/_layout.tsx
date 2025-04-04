import { Entypo, FontAwesome } from '@expo/vector-icons';
import type {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import type { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useColorScheme } from '~/lib/useColorScheme';

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
            tabBarIcon: ({ color }) => <Entypo size={28} name="home" color={color} />,
            tabBarLabelStyle: {
              display: 'none',
            },
          }}
        />
        <MaterialTopTabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
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
