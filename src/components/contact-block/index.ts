import { Block } from '../../modules/block';
import ChatAdd from './chat-add';
import ChatList from './chat-list';

import tmpl from './tmpl';
import './style.scss';

export default class ContactBlock extends Block {
  constructor() {
    super('div', {
      attributes: {
        class: ['contact-block'],
      },
      components: {
        chatAdd: new ChatAdd(),
        chatList: new ChatList(),
      },
    });
  }

  mounted(): void {}

  render(): string {
    return tmpl;
  }
}
