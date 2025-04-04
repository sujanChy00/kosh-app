import { BottomSheetView } from '@gorhom/bottom-sheet';
import { TouchableOpacity, View } from 'react-native';
import Animated, { BounceIn, withTiming } from 'react-native-reanimated';

import { ChevronRight } from './icons/chevron-right';
import { LanguageIcon } from './icons/language-icon';
import { Button } from './ui/button';
import { Sheet, useSheetRef } from './ui/sheet';
import { Text } from './ui/text';

import { useLanguage } from '~/providers/language/hook';

export const LanguageSelector = () => {
  const ref = useSheetRef();
  const { getText, language, setLanguage } = useLanguage();
  const isNepali = language === 'np';
  const isEnglish = language === 'en';
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          ref.current?.present();
        }}
        className="p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-x-2">
            <LanguageIcon className="text-muted-foreground" />
            <Text className="font-medium">{getText('language')}</Text>
          </View>
          <ChevronRight size={22} className="text-muted-foreground" />
        </View>
      </TouchableOpacity>
      <Sheet ref={ref} snapPoints={[220]}>
        <BottomSheetView className="gap-y-6 p-5">
          <Button
            onPress={() => {
              setLanguage('np');
            }}
            size="flat"
            className="justify-between rounded-xl border-2 border-primary"
            variant="tonal">
            <Text>नेपाली</Text>
            <View className="size-6 items-center justify-center rounded-full border-2 border-background">
              {isNepali && (
                <Animated.View
                  entering={BounceIn.easing(withTiming).duration(100)}
                  className="size-4 rounded-full bg-primary shadow"
                />
              )}
            </View>
          </Button>
          <Button
            onPress={() => {
              setLanguage('en');
            }}
            size="flat"
            className="justify-between rounded-xl border-2 border-primary"
            variant="tonal">
            <Text>English</Text>
            <View className="size-6 items-center justify-center rounded-full border-2 border-background">
              {isEnglish && (
                <Animated.View
                  entering={BounceIn.easing(withTiming).duration(100)}
                  className="size-4 rounded-full bg-primary shadow"
                />
              )}
            </View>
          </Button>
        </BottomSheetView>
      </Sheet>
    </View>
  );
};
