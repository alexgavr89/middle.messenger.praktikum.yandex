import Handlebars from 'handlebars';
import { Block } from '../../../../modules/block';
import Store from '../../../../modules/store';

import tmpl from './tmpl';
import './style.scss';

const store = Store.getInstance();

export interface IMessage {
  chat_id: number;
  content: string;
  file: string | null;
  id: number;
  is_read: boolean;
  time: string;
  type: string;
  user_id: number;
}

export class Message extends Block {
  constructor(props: IMessage) {
    const messageClass = ['message'];
    const userId = store.get('user.id');

    if (userId === props.user_id) {
      messageClass.push('message__user');
    } else {
      messageClass.push('message__contact');
    }

    super('div', {
      block: {
        ...props,
      },
      attributes: {
        class: messageClass,
      },
    });
  }

  mounted(): void {}

  render(): string {
    const message = Handlebars.compile(tmpl);

    return message(this.props.block);
  }
}
