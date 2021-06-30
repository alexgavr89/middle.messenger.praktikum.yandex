import Handlebars from 'handlebars';
import { Block, Props } from '../../../modules/block';
import Store from '../../../modules/store';
import Message from './message';
import tmpl from './tmpl';

import './style.scss';

interface IMessageBlock extends Props {
  list?: [];
}

const store = Store.getInstance();

export default class MessageBlock extends Block {
  constructor(props?: IMessageBlock) {
    super('div', { ...props });
  }

  mounted(): void {
    store.registerEvent('messages', (messages) => {
      this.setProps({ list: messages });
    });
  }

  compile(): string {
    const messageBlock = Handlebars.compile(tmpl);

    return messageBlock(this.props);
  }

  update(): void {
    const messageBlock = this.element.querySelector('.message-block');

    if (this.props.list) {
      this.props.list.forEach((element) => {
        const stylesWrap = ['message'];

        if (store.props.user.id === element.user_id) {
          stylesWrap.push('message__user');
        } else {
          stylesWrap.push('message__contact');
        }
        const message = new Message({ ...element, stylesWrap });
        messageBlock.append(message.getContent());
      });
    }
  }
}
