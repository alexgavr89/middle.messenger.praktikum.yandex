import { Block } from '../../../modules/block';
import ChatBlock from './chat-block';
import ChatController from '../../../controllers/ChatController';
import Store from '../../../modules/store';
import { IChat } from './chat-block/chat';

import tmpl from './tmpl';
import './style.scss';

interface IChatListProps {
  [key: string]: IChat;
}

const store = Store.getInstance();

export default class ChatList extends Block {
  constructor() {
    super('div', {
      attributes: {
        class: ['chat-list'],
      },
      list: {},
    });

    store.addEvent('chats', () => {
      const listBlock = this.createDocumentElement('div');
      const list = store.get('chats') as IChatListProps;

      Object.keys(list).forEach((key) => {
        const chatBlock = new ChatBlock({
          chatProps: {
            block: {
              avatar: list[key].avatar,
              created_by: list[key].created_by,
              id: list[key].id,
              last_message: list[key].last_message,
              title: list[key].title,
              unread_count: list[key].unread_count,
            },
          },
        });

        listBlock.append(chatBlock.getContent());
      });

      this.setProps({
        list: {
          chat: listBlock,
        },
      });
    });

    ChatController.get();
  }

  mounted(): void {}

  render(): string {
    return tmpl;
  }
}
