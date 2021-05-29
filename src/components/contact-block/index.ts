import { Block } from '../../modules/block';
import ChatAdd from './chat-add';
import ChatList from './chat-list';
import Store from '../../modules/store';
import ChatController from '../../controllers/ChatController';

import './style.scss';

const store = Store.getInstance({});

export default class ContactBlock extends Block {
  constructor() {
    ChatController.get();

    super('div', {
      chatAdd: new ChatAdd(),

      chatList: new ChatList({ list: [] }),

      stylesWrap: ['contact-block'],
    });
  }

  mounted(): void {
    store.registerEvent('chats', (chats) => {
      this.props.chatList.setProps({ list: chats });
    });
  }

  update(): void {
    const { chatAdd, chatList } = this.props;

    this.element.append(chatAdd.getContent());
    this.element.append(chatList.getContent());
  }
}
