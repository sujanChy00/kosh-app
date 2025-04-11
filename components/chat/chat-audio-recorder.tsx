import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { useEffect, useRef } from 'react';
import { Pressable } from 'react-native';
import Animated, { LayoutAnimationConfig, ZoomIn } from 'react-native-reanimated';

import { MicIcon } from '~/components/icons/mic-icon';
import { PauseIcon } from '~/components/icons/pause-icon';
import { useChat } from '~/providers/chat/hook';

export const ChatAudioRecorder = () => {
  const { recording, setRecording, setSound, setElapsedTime } = useChat();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (recording) {
      setElapsedTime(0);
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [recording, setElapsedTime]);

  async function startRecording() {
    try {
      if (permissionResponse?.status !== Audio.PermissionStatus.GRANTED) {
        const permission = await requestPermission();
        if (permission.status !== Audio.PermissionStatus.GRANTED) {
          console.error('Permission not granted');
          return;
        }
      }

      console.log('Setting up audio mode for recording...');
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
        interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      });

      console.log('Creating recording...');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      console.log('Recording started');
      setRecording(recording);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    if (!recording) return;

    try {
      console.log('Stopping recording...');
      await recording.stopAndUnloadAsync();

      console.log('Setting up audio mode for playback...');
      // Configure audio mode for playback
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        interruptionModeIOS: InterruptionModeIOS.DoNotMix,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      const uri = recording.getURI();
      console.log('Recording saved to:', uri);

      setRecording(undefined);
      setSound(uri);
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  }

  return (
    <LayoutAnimationConfig skipEntering>
      <Animated.View entering={ZoomIn} key={recording ? 'recording' : 'not'}>
        <Pressable onPress={recording ? stopRecording : startRecording}>
          {recording ? (
            <PauseIcon className="text-destructive" />
          ) : (
            <MicIcon className="text-foreground" />
          )}
        </Pressable>
      </Animated.View>
    </LayoutAnimationConfig>
  );
};
