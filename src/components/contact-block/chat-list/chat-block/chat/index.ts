import { readFileSync } from 'fs';
import Handlebars from 'handlebars';
import { Block, Props } from '../../../../../modules/block';
import Avatar from '../../../../avatar';

import './style.scss';

export interface IChat extends Props {
  avatar: string | null;
  created_by: number;
  id: number;
  last_message: string | null;
  title: string;
  unread_count: number | null;
}

interface IChatProps extends IChat {
  avataBlock?: Avatar;
}

export class Chat extends Block {
  constructor(props: IChatProps) {
    super('div', {
      ...props,
      avataBlock: new Avatar({ src: props.avatar }),
      stylesWrap: ['chat'],
    });
  }

  compile(): string {
    const tmpl = readFileSync(
      './src/components/contact-block/chat-list/chat-block/chat/tmpl.hbs',
      'utf8',
    );
    const chat = Handlebars.compile(tmpl);

    if (this.props.unread_count === 0) {
      this.props.unread_count = null;
    }

    if (this.props.last_message) {
      const lastMessage = JSON.parse(this.props.last_message);
      this.props.last_message = lastMessage.content;
    }

    return chat(this.props);
  }

  update(): void {
    this.element.insertBefore(
      this.props.avataBlock.getContent(),
      this.element.firstChild,
    );
  }
}
