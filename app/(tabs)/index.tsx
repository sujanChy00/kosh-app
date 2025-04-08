import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { KeyboardGestureArea, useKeyboardHandler } from 'react-native-keyboard-controller';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const history = [
  { text: 'Hmmm🤔' },
  { text: 'It looks like it still will be choppy...' },
  { text: "But I don't know what should I try next" },
  { text: 'Reanimated?', sender: true },
  { text: 'A little bit disappointed 😔' },
  { text: '🤯' },
  { text: 'Try to check it. I hope it helps you...', sender: true },
  { text: 'It really pushes you to think twice on how to design it first' },
  {
    text: 'Looks promising!😎 I was always looking for a solution that would allow us to run animations on native thread and provide at least stable 60 FPS',
  },
  { text: 'You have to check it!!!', sender: true },
  { text: "Ha-ha! I'm definitely going to check it!" },
  { text: 'Hello! How are you?' },
  { text: "Hi! I'm good. How are you?", sender: true },
  {
    text: "I'm fine, thank you! Have you seen new keyboard animation library?",
  },
  { text: 'No! Let me check.', sender: true },
  {
    text: "Wow! I've been looking for it for a while. It's awesome!",
    sender: true,
  },
  { text: 'Yes! It is really awesome!', sender: true },
  {
    text: "It's really awesome! I'm going to use it in my next project!",
    sender: true,
  },
  {
    text: "It's really awesome! I'm going to use it in my next project!",
    sender: true,
  },
];

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const useKeyboardAnimation = () => {
  const progress = useSharedValue(0);
  const height = useSharedValue(0);

  useKeyboardHandler({
    onMove: (e) => {
      'worklet';
      progress.value = e.progress;
      height.value = e.height;
    },
    onInteractive: (e) => {
      'worklet';

      progress.value = e.progress;
      height.value = e.height;
    },
  });

  return { height, progress };
};

export default function Screen() {
  const navigation = useNavigation();
  const [interpolator, setInterpolator] = useState<'ios' | 'linear'>('linear');
  const { height } = useKeyboardAnimation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text
          style={styles.header}
          onPress={() => setInterpolator(interpolator === 'ios' ? 'linear' : 'ios')}>
          {interpolator}
        </Text>
      ),
    });
  }, [interpolator]);

  const scrollViewStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateY: -height.value }, ...styles.inverted.transform],
    }),
    []
  );
  const textInputStyle = useAnimatedStyle(
    () => ({
      height: 50,
      width: '100%',
      backgroundColor: '#BCBCBC',
      transform: [{ translateY: -height.value }],
    }),
    []
  );
  const fakeView = useAnimatedStyle(
    () => ({
      height: height.value,
    }),
    []
  );

  return (
    <View style={styles.container}>
      <KeyboardGestureArea
        // showOnSwipeUp
        interpolator={interpolator}
        offset={50}
        style={styles.content}
        testID="chat.gesture">
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          style={scrollViewStyle}
          testID="chat.scroll">
          <View style={styles.inverted}>
            <Animated.View style={fakeView} />
            {history.map((message, index) => (
              <Message key={index} {...message} />
            ))}
          </View>
        </Animated.ScrollView>
      </KeyboardGestureArea>
      <AnimatedTextInput style={textInputStyle} testID="chat.input" />
    </View>
  );
}

const container = {
  borderRadius: 10,
  padding: 10,
  margin: 10,
  marginVertical: 5,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  header: {
    color: 'black',
    marginRight: 12,
  },
  inverted: {
    transform: [
      {
        rotate: '180deg',
      },
    ],
  },
  content: {
    flex: 1,
  },
  senderContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#e0e0e0',
    ...container,
  },
  recipientContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#50FF00',
    ...container,
  },
  message: {
    color: '#000000',
  },
});

function Message({ text, sender }: { text: string; sender?: boolean }) {
  return (
    <View style={sender ? styles.senderContainer : styles.recipientContainer}>
      <Text style={styles.message}>{text}</Text>
    </View>
  );
}
