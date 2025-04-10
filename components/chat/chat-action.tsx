import { View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import { ChatInput } from './chat-input';
import { ChatOptions } from './chat-options';

type Props = {
  onSend: (message: string) => void;
};

export const ChatAction = ({ onSend }: Props) => {
  const progress = useSharedValue(0);
  return (
    <View>
      <ChatInput onSend={onSend} progress={progress} />
      <ChatOptions progress={progress} />
    </View>
  );
};
