import { Block } from '../../../../modules/block';
import { Chat, ChatProps } from './chat';
import UserBlock from './user-block';

import tmpl from './tmpl';

interface ChatBlockProps {
  chatProps: ChatProps;
}

export default class ChatBlock extends Block {
  constructor(props: ChatBlockProps) {
    super('div', {
      components: {
        chat: new Chat(props.chatProps),
        userBlock: new UserBlock({ chatId: props.chatProps.block.id }),
      },
    });
  }

  mounted(): void {}

  render(): string {
    return tmpl;
  }
}
