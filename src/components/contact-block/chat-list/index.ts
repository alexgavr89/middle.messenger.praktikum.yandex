import { Block } from '../../../modules/block';
import ChatBlock from './chat-block';
import ChatController from '../../../controllers/ChatController';
import Store from '../../../modules/store';
import { IChat } from './chat-block/chat';

import tmpl from './tmpl';
import './style.scss';

const store = Store.getInstance();
const chatController = new ChatController();

export default class ChatList extends Block {
  constructor() {
    super('div', {
      attributes: {
        class: ['chat-list'],
      },
      list: {},
    });

    store.addEventChange('chats', () => {
      const listBlock = this.createDocumentElement('div');
      const list = store.get('chats') as IChat[] | undefined;

      if (list) {
        list.map((chat) => {
          const chatBlock = new ChatBlock({
            chatProps: {
              block: {
                avatar: chat.avatar,
                created_by: chat.created_by,
                id: chat.id,
                last_message: chat.last_message,
                title: chat.title,
                unread_count: chat.unread_count,
              },
            },
          });

          listBlock.append(chatBlock.getContent());

          return chat;
        });
      }

      this.setProps({
        list: {
          chat: listBlock,
        },
      });
    });

    chatController.get();
  }

  mounted(): void {}

  render(): string {
    return tmpl;
  }
}
