import { Block } from '../../modules/block';
import UserBlock from './user-block';
import MessageBlock from './messege-block';
import SendBlock from './send-block';

import './style.scss';

export default class ChatBlock extends Block {
  constructor() {
    super('div', {
      settingBlock: new UserBlock(),
      messageBlock: new MessageBlock(),
      sendBlock: new SendBlock(),
      stylesWrap: ['chat-block'],
    });
  }

  update(): void {
    const { settingBlock, messageBlock, sendBlock } = this.props;

    this.element.append(settingBlock.getContent());
    this.element.append(messageBlock.getContent());
    this.element.append(sendBlock.getContent());
  }
}
