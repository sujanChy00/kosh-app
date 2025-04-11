import { LegendListRef } from '@legendapp/list';
import { Audio } from 'expo-av';
import { createContext } from 'react';
import { SharedValue } from 'react-native-reanimated';

type Chat = {
  id: string;
  text: string;
  isUser: boolean;
};

export type ChatContextTyp = {
  isOptionsVisible: boolean;
  setIsOptionsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  showScrollButton: boolean;
  setShowScrollButton: React.Dispatch<React.SetStateAction<boolean>>;
  ref: React.RefObject<LegendListRef> | null;
  handleScrollToEnd: () => void;
  handleSendMessage: (message: string) => void;
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  progress?: SharedValue<number>;
  OPTIONS_HEIGHT: number;
  recording?: Audio.Recording;
  setRecording: React.Dispatch<React.SetStateAction<Audio.Recording | undefined>>;
  sound: string | null;
  setSound: React.Dispatch<React.SetStateAction<string | null>>;
  elapsedTime: number;
  setElapsedTime: React.Dispatch<React.SetStateAction<number>>;
  formatedElapsedTime: () => string;
  formatedRecordingTime: () => string;
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
};

export const ChatContext = createContext<ChatContextTyp>({
  showScrollButton: false,
  setShowScrollButton: () => {},
  ref: null,
  handleScrollToEnd: () => {},
  handleSendMessage: () => {},
  chats: [],
  setChats: () => {},
  progress: undefined,
  isOptionsVisible: false,
  setIsOptionsVisible: () => {},
  OPTIONS_HEIGHT: 0,
  setRecording: () => {},
  sound: null,
  setSound: () => {},
  elapsedTime: 0,
  setElapsedTime: () => {},
  formatedElapsedTime: () => '',
  duration: 0,
  setDuration: () => {},
  formatedRecordingTime: () => '',
});
