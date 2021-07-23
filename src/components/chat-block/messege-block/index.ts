import { Block } from '../../../modules/block';
import Store from '../../../modules/store';
import { Message, IMessage } from './message';

import tmpl from './tmpl';
import './style.scss';

const store = Store.getInstance();

export default class MessageBlock extends Block {
  constructor() {
    super('div', {
      list: {},
    });

    store.addEventChange('messages', () => {
      const listBlock = this.createDocumentElement('div');
      const list = store.get('messages') as IMessage[] | undefined;

      if (list) {
        list.map((message) => {
          const messageBlock = new Message({
            ...message,
          });

          listBlock.append(messageBlock.getContent());

          return message;
        });
      }

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
