import { Audio } from 'expo-av';
import { useEffect, useRef } from 'react';
import { Pressable } from 'react-native';
import Animated, { LayoutAnimationConfig, ZoomIn } from 'react-native-reanimated';

import { MicIcon } from '~/components/icons/mic-icon';
import { PauseIcon } from '~/components/icons/pause-icon';
import { useChat } from '~/providers/chat/hook';

export const ChatAudioRecorder = () => {
  const { recording, setRecording, setSound, setElapsedTime, elapsedTime } = useChat();
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
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    if (recording) {
      setRecording(undefined);
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      const uri = recording.getURI();
      setSound(uri);
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
