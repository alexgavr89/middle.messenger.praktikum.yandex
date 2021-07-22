import { Block } from '../../../modules/block';
import Store from '../../../modules/store';
import { Message, IMessage } from './message';

import tmpl from './tmpl';
import './style.scss';

type List = {
  [key: string]: IMessage
};

const store = Store.getInstance();

export default class MessageBlock extends Block {
  constructor() {
    super('div', {
      list: {},
    });

    store.addEvent('messages', () => {
      const listBlock = this.createDocumentElement('div');
      const list = store.get('messages') as List;

      Object.keys(list).forEach((key) => {
        const message = new Message({
          ...list[key],
        });

        listBlock.append(message.getContent());
      });

      this.setProps({
        list: {
          messages: listBlock,
        },
      });
    });
  }

  mounted(): void {}

  render(): string {
    return tmpl;
  }
}
