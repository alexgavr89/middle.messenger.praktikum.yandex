import { Block } from '../../modules/block';
import MessengerBlock from '../../components/messenger-block';

import '../style.scss';

export default class Messenger extends Block {
  constructor() {
    super('div', {
      messengerBlock: new MessengerBlock(),

      stylesWrap: ['app'],

      setting: {
        uuid: true,
      },
    });
  }

  update(): void {
    this.element.append(this.props.messengerBlock.getContent());
  }
}
