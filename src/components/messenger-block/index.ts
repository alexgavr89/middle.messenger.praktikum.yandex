import { Block } from '../../modules/block';
import ContactBlock from '../contact-block';
import ChatBlock from '../chat-block';

import tmpl from './tmpl';
import './style.scss';

export default class MessengerBlock extends Block {
  constructor() {
    super('div', {
      attributes: {
        class: ['messenger-block'],
      },
      components: {
        contactBlock: new ContactBlock(),
        chatBlock: new ChatBlock(),
      },
    });
  }

  mounted():void {}

  render(): string {
    return tmpl;
  }
}
