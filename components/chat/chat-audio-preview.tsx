import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { LayoutAnimationConfig, ZoomIn } from 'react-native-reanimated';

import { Text } from '../ui/text';

import { X } from '~/components/icons/close-icon';
import { PauseIcon } from '~/components/icons/pause-icon';
import { PlayIcon } from '~/components/icons/play-icon';
import { useChat } from '~/providers/chat/hook';

export const ChatAudioPreview = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundObject, setSoundObject] = useState<Audio.Sound>();
  const { sound, formatedElapsedTime, setSound, setRecording, setDuration, setElapsedTime } =
    useChat();

  useEffect(() => {
    const loadSound = async () => {
      try {
        if (sound) {
          console.log('Loading sound from URI:', sound);

          // Ensure audio mode is set correctly for playback
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            playsInSilentModeIOS: true,
            staysActiveInBackground: true,
            interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
            interruptionModeIOS: InterruptionModeIOS.DoNotMix,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: false,
          });

          const { sound: audioSound } = await Audio.Sound.createAsync(
            { uri: sound },
            {
              shouldPlay: false,
              volume: 1.0,
              isLooping: false,
              isMuted: false,
            },
            (status) => {
              console.log(status);
            }
          );

          console.log('Sound loaded successfully');
          setSoundObject(audioSound);

          const status = await audioSound.getStatusAsync();
          if (status.isLoaded) {
            setDuration(Math.floor(status.durationMillis / 1000));
          }

          // Add status update listener
          audioSound.setOnPlaybackStatusUpdate((status) => {
            console.log('Playback status:', JSON.stringify(status, null, 2));

            if (status.isLoaded) {
              setIsPlaying(status.isPlaying);
              setElapsedTime(Math.floor(status.positionMillis / 1000));
              if (status.didJustFinish) {
                setIsPlaying(false);
                setElapsedTime(0);
              }
            }
          });
        }
      } catch (error) {
        console.error('Error loading sound:', error);
      }
    };

    loadSound();

    return () => {
      if (soundObject) {
        soundObject.unloadAsync();
      }
    };
  }, [sound]);

  const onPlay = async () => {
    try {
      if (soundObject) {
        console.log('Starting playback...');
        const status = await soundObject.getStatusAsync();
        console.log('Current status before play:', status);

        // Reset to beginning if at end
        if (status.isLoaded && status.positionMillis === status.durationMillis) {
          await soundObject.setPositionAsync(0);
        }

        await soundObject.playAsync();
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const onPause = async () => {
    try {
      if (soundObject) {
        console.log('Pausing playback...');
        await soundObject.pauseAsync();
      }
    } catch (error) {
      console.error('Error pausing sound:', error);
    }
  };

  const onClose = async () => {
    try {
      if (soundObject) {
        await soundObject.unloadAsync();
      }
      setSound(null);
      setRecording(undefined);
    } catch (error) {
      console.error('Error closing sound:', error);
    }
  };

  return (
    <View className="h-full flex-1 flex-row items-center justify-between rounded-full bg-blue-500 py-3.5 pr-2">
      <View className="flex-row items-center gap-x-2">
        <Pressable onPress={onClose}>
          <X size={22} className="text-destructive" />
        </Pressable>
        <Text className="text-sm text-muted">{formatedElapsedTime()}</Text>
      </View>
      <View className="h-[1px] flex-1 bg-muted" />
      <View className="size-8 items-center justify-center rounded-full bg-muted">
        <LayoutAnimationConfig skipEntering>
          <Animated.View entering={ZoomIn} key={isPlaying ? 'playing' : 'not'}>
            <Pressable onPress={isPlaying ? onPause : onPlay}>
              {isPlaying ? (
                <PauseIcon className="text-blue-500" size={20} />
              ) : (
                <PlayIcon className="text-blue-500" size={20} />
              )}
            </Pressable>
          </Animated.View>
        </LayoutAnimationConfig>
      </View>
    </View>
  );
};
