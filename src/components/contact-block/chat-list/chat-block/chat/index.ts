import Handlebars from 'handlebars';
import { Block } from '../../../../../modules/block';
import Avatar from '../../../../avatar';
import ChatUserController from '../../../../../controllers/ChatUserController';
import Store from '../../../../../modules/store';

import tmpl from './tmpl';
import './style.scss';

const store = Store.getInstance();

export interface ChatProps {
  block: {
    avatar: string | null;
    created_by: number;
    id: number;
    last_message: LastMessage | null;
    title: string;
    unread_count: number | null;
    last_message_content?: string;
    unread_count_str?: string;
  }
}

export interface IChat {
  avatar: string | null;
  created_by: number;
  id: number;
  last_message: LastMessage | null;
  title: string;
  unread_count: number | null;
}

interface LastMessage {
  content: string;
  id: number;
  time: string;
}

const chatUserController = new ChatUserController();

export class Chat extends Block {
  constructor(props: ChatProps) {
    if (props.block.unread_count === 0) {
      props.block.unread_count_str = '';
    } else {
      props.block.unread_count_str = `${props.block.unread_count}`;
    }

    if (props.block.last_message) {
      const { content } = props.block.last_message;

      props.block.last_message_content = content;
    } else {
      props.block.last_message_content = '';
    }

    super('div', {
      ...props,
      attributes: {
        class: ['chat'],
      },
      events: {
        click: () => {
          store.setProps({
            show: {
              userBlock: {
                [`${this.props.block?.id}`]: true,
              },
            },
            event: {
              click: {
                chat: this.props.block?.id,
              },
            },
          });

          if (typeof this.props.block?.id === 'number') {
            chatUserController.get(this.props.block.id);
          }
        },
      },
      components: {
        avatar: new Avatar({
          block: {
            src: props.block.avatar,
          },
        }),
      },
    });
  }

  mounted(): void {}

  render(): string {
    const chat = Handlebars.compile(tmpl);

    return chat(this.props.block);
  }
}
