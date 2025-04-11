import { View } from 'react-native';

import { ChatInput } from './chat-input';
import { ChatOptions } from './chat-options';

export const ChatAction = () => {
  return (
    <View>
      <ChatInput />
      <ChatOptions />
    </View>
  );
};
