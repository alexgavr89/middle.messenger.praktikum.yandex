import { readFileSync } from 'fs';
import Handlebars from 'handlebars';
import { Block, Props } from '../../../../modules/block';

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
    const tmpl = readFileSync(
      './src/components/chat-block/messege-block/message/tmpl.hbs',
      'utf8',
    );
    const message = Handlebars.compile(tmpl);

    return message(this.props);
  }
}
