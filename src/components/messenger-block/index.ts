import { Block } from '../../modules/block';
import ContactBlock from '../contact-block';
import ChatBlock from '../chat-block';

import './style.scss';

export default class MessengerBlock extends Block {
  constructor() {
    super('div', {
      contactBlock: new ContactBlock(),

      chatBlock: new ChatBlock(),

      stylesWrap: ['messenger-block'],
    });
  }

  update(): void {
    const { contactBlock, chatBlock } = this.props;

    this.element.append(contactBlock.getContent());
    this.element.append(chatBlock.getContent());
  }
}
