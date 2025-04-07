import * as AccordionPrimitive from '@rn-primitives/accordion';
import * as React from 'react';
import { GestureResponderEvent, Platform, Pressable, ScrollView, View } from 'react-native';
import Animated, {
  Extrapolation,
  LayoutAnimationConfig,
  LinearTransition,
  SlideInUp,
  SlideOutUp,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

import { ChevronDownIcon } from '../icons/chevrondown-icon';

import { TextClassContext } from '~/components/ui/text';
import { cn } from '~/lib/cn';

const AccordionContext = React.createContext<{
  scrollRef?: React.RefObject<ScrollView>;
}>({});
const useAccordion = () => {
  return React.useContext(AccordionContext);
};

type AccordionRootProps = AccordionPrimitive.RootProps & {
  scrollRef?: React.RefObject<ScrollView>;
};

const Accordion = React.forwardRef<AccordionPrimitive.RootRef, AccordionRootProps>(
  ({ children, scrollRef, ...props }, ref) => {
    return (
      <AccordionContext.Provider value={{ scrollRef }}>
        <LayoutAnimationConfig skipEntering>
          <AccordionPrimitive.Root
            ref={ref}
            {...props}
            className={cn('rounded-xl border border-border')}
            asChild={Platform.OS !== 'web'}>
            <Animated.View layout={LinearTransition.duration(200)}>{children}</Animated.View>
          </AccordionPrimitive.Root>
        </LayoutAnimationConfig>
      </AccordionContext.Provider>
    );
  }
);

Accordion.displayName = AccordionPrimitive.Root.displayName;

const AccordionItem = React.forwardRef<AccordionPrimitive.ItemRef, AccordionPrimitive.ItemProps>(
  ({ className, value, ...props }, ref) => {
    return (
      <Animated.View className="overflow-hidden" layout={LinearTransition.duration(200)}>
        <AccordionPrimitive.Item
          ref={ref}
          className={cn('border-b border-border', className)}
          value={value}
          {...props}
        />
      </Animated.View>
    );
  }
);
AccordionItem.displayName = AccordionPrimitive.Item.displayName;

const Trigger = Platform.OS === 'web' ? View : Pressable;

const AccordionTrigger = React.forwardRef<
  AccordionPrimitive.TriggerRef,
  AccordionPrimitive.TriggerProps
>(({ className, children, ...props }, ref) => {
  const { isExpanded } = AccordionPrimitive.useItemContext();
  const { scrollRef } = useAccordion();

  const handlePress = (event: GestureResponderEvent) => {
    if (scrollRef && scrollRef?.current) {
      event.persist();
      if (event.nativeEvent.pageY) {
        setTimeout(() => {
          scrollRef.current?.scrollTo({
            y: event.nativeEvent.pageY - 20,
            animated: true,
          });
        }, 100);
      }
    }
    props.onPress?.(event);
  };

  const progress = useDerivedValue(() =>
    isExpanded ? withTiming(1, { duration: 250 }) : withTiming(0, { duration: 200 })
  );
  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * 180}deg` }],
    opacity: interpolate(progress.value, [0, 1], [1, 0.8], Extrapolation.CLAMP),
  }));

  return (
    <TextClassContext.Provider value="native:text-lg font-medium web:group-hover:underline">
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger ref={ref} {...props} onPress={handlePress} asChild>
          <Trigger
            className={cn(
              'group flex flex-row items-center justify-between overflow-hidden p-3 web:flex-1 web:transition-all web:focus-visible:outline-none web:focus-visible:ring-1 web:focus-visible:ring-muted-foreground',
              className
            )}>
            <>{children}</>
            <Animated.View style={chevronStyle}>
              <ChevronDownIcon size={18} className="shrink-0 text-foreground" />
            </Animated.View>
          </Trigger>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    </TextClassContext.Provider>
  );
});
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  AccordionPrimitive.ContentRef,
  AccordionPrimitive.ContentProps
>(({ className, children, ...props }, ref) => {
  const { isExpanded } = AccordionPrimitive.useItemContext();
  return (
    <TextClassContext.Provider value="native:text-lg">
      <AccordionPrimitive.Content
        className={cn(
          'overflow-hidden text-sm web:transition-all',
          isExpanded ? 'web:animate-accordion-down' : 'web:animate-accordion-up'
        )}
        ref={ref}
        {...props}>
        <InnerContent className={cn('p-3 pt-0', className)}>{children}</InnerContent>
      </AccordionPrimitive.Content>
    </TextClassContext.Provider>
  );
});

function InnerContent({ children, className }: { children: React.ReactNode; className?: string }) {
  if (Platform.OS === 'web') {
    return <View className={cn('pb-4', className)}>{children}</View>;
  }
  return (
    <Animated.View
      entering={SlideInUp.easing(withTiming).duration(200)}
      exiting={SlideOutUp.easing(withTiming).duration(200)}
      className={cn('pb-4', className)}>
      {children}
    </Animated.View>
  );
}

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
