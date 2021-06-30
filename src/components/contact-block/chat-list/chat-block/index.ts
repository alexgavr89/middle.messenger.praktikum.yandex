import { Block, Props } from '../../../../modules/block';
import { Chat, IChat } from './chat';
import UserBlock from './user-block';
import ChatUserController from '../../../../controllers/ChatUserController';
import WebSocketController from '../../../../controllers/WebSocketController';

interface ChatBlockProps extends Props {
  chatProps: IChat;
  chat?: Chat;
  userBlock?: UserBlock;
}

export default class ChatBlock extends Block {
  constructor(props: ChatBlockProps) {
    super('div', {
      ...props,

      chat: new Chat({
        ...props.chatProps,
        events: {
          click: () => {
            ChatUserController.get(this.props.chatProps.id);

            WebSocketController.connect(this.props.chatProps.id);
          },
        },
      }),

      userBlock: new UserBlock({ chatId: props.chatProps.id }),
    });
  }

  update(): void {
    const { chat, userBlock } = this.props;

    this.element.append(chat.getContent());
    this.element.append(userBlock.getContent());
  }
}
