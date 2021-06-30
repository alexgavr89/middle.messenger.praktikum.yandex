import Handlebars from 'handlebars';
import { Block, Props } from '../../../../modules/block';
import tmpl from './tmpl';

import './style.scss';

interface IMessage extends Props {
  chat_id: number;
  content: string;
  file: string | null;
  id: number;
  is_read: boolean;
  time: string;
  type: string;
  user_id: number;
}

export default class Message extends Block {
  constructor(props: IMessage) {
    super('div', props);
  }

  compile(): string {
    const message = Handlebars.compile(tmpl);

    return message(this.props);
  }
}
