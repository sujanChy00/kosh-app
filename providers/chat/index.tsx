import { LegendListRef } from '@legendapp/list';
import { Audio } from 'expo-av';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';

import { ChatContext } from './context';

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const OPTIONS_HEIGHT = 100;
  const [elapsedTime, setElapsedTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [recording, setRecording] = useState<Audio.Recording>();
  const [sound, setSound] = useState<string | null>(null);
  const progress = useSharedValue(0);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const data = useMemo(
    () =>
      Array.from({ length: 50 }).map((_, index) => ({
        id: index.toString(),
        text: 'Hello, my container is blurring contents underneath knkjhkjhjhghfhgf!',
        isUser: index % 2 === 0,
      })),
    []
  );

  const [chat, setChats] = useState(data);
  const ref = useRef<LegendListRef>(null);
  const handleScrollToEnd = useCallback(() => {
    ref.current?.scrollToEnd();
  }, []);

  const formatedRecordingTime = (): string => {
    const mins = Math.floor(elapsedTime / 60);
    const secs = elapsedTime % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatedElapsedTime = (): string => {
    const formatTime = (time: number) => {
      const mins = Math.floor(time / 60);
      const secs = time % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    return `${formatTime(elapsedTime)} / ${formatTime(duration)}`;
  };

  const handleSendMessage = useCallback((message: string) => {
    setChats((prev) => [
      ...prev,
      {
        id: prev.length.toString(),
        text: message,
        isUser: true,
      },
    ]);
    ref.current?.scrollToEnd();
  }, []);

  return (
    <ChatContext.Provider
      value={{
        chats: chat,
        setChats,
        ref,
        handleScrollToEnd,
        handleSendMessage,
        setShowScrollButton,
        showScrollButton,
        progress,
        isOptionsVisible,
        setIsOptionsVisible,
        OPTIONS_HEIGHT,
        recording,
        setRecording,
        sound,
        setSound,
        elapsedTime,
        setElapsedTime,
        formatedElapsedTime,
        duration,
        setDuration,
        formatedRecordingTime,
      }}>
      {children}
    </ChatContext.Provider>
  );
};
