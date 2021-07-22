import { Block } from '../../modules/block';
import UserBlock from './user-block';
import MessageBlock from './messege-block';
import SendBlock from './send-block';

import tmpl from './tmpl';
import './style.scss';

export default class ChatBlock extends Block {
  constructor() {
    super('div', {
      attributes: {
        class: ['chat-block'],
      },
      components: {
        settingBlock: new UserBlock(),
        messageBlock: new MessageBlock(),
        sendBlock: new SendBlock(),
      },
    });
  }

  mounted(): void {}

  render(): string {
    return tmpl;
  }
}
