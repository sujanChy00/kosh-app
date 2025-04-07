import { Icon } from '@roninoss/icons';
import { Pressable, View } from 'react-native';
import Animated, { LayoutAnimationConfig, ZoomInRotate } from 'react-native-reanimated';

import { Text } from './ui/text';
import { Toggle } from './ui/toggle';

import { useColorScheme } from '~/hooks/use-color-scheme';
import { cn } from '~/lib/cn';

export function ThemeToggle({ className, iconColor }: { className?: string; iconColor?: string }) {
  const { colorScheme, toggleColorScheme, isDarkColorScheme } = useColorScheme();
  return (
    <Pressable onPress={toggleColorScheme} className="flex-row items-center justify-between p-4">
      <View className="flex-row items-center gap-2">
        <LayoutAnimationConfig skipEntering>
          <Animated.View entering={ZoomInRotate} key={`toggle-${colorScheme}`}>
            {isDarkColorScheme ? (
              <Icon
                namingScheme="sfSymbol"
                name="moon.stars"
                size={24}
                color={iconColor ?? '#8e8e93'}
              />
            ) : (
              <Icon
                namingScheme="sfSymbol"
                size={24}
                name="sun.min"
                color={iconColor ?? '#8e8e93'}
              />
            )}
          </Animated.View>
        </LayoutAnimationConfig>
        <Text className={cn('font-medium', className)}>Theme</Text>
      </View>
      <Toggle value={colorScheme === 'dark'} onValueChange={toggleColorScheme} />
    </Pressable>
    // <LayoutAnimationConfig skipEntering>
    //   <Animated.View
    //     className="items-center justify-center"
    //     key={`toggle-${colorScheme}`}
    //     entering={ZoomInRotate}>
    //     <Pressable onPress={toggleColorScheme} className="opacity-80">
    //       {colorScheme === 'dark'
    //         ? ({ pressed }) => (
    //             <View className={cn('px-0.5', pressed && 'opacity-50')}>
    //               <Icon namingScheme="sfSymbol" name="moon.stars" color={COLORS.white} />
    //             </View>
    //           )
    //         : ({ pressed }) => (
    //             <View className={cn('px-0.5', pressed && 'opacity-50')}>
    //               <Icon namingScheme="sfSymbol" name="sun.min" color={COLORS.black} />
    //             </View>
    //           )}
    //     </Pressable>
    //   </Animated.View>
    // </LayoutAnimationConfig>
  );
}
