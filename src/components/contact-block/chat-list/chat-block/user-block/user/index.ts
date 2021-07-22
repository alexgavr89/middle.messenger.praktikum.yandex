import Handlebars from 'handlebars';
import { Block } from '../../../../../../modules/block';
import Avatar from '../../../../../avatar';
import ButtonIcon from '../../../../../button-icon';
import tmpl from './tmpl';
import './style.scss';

export interface IUser {
  id: number;
  first_name: string | null;
  second_name: string | null;
  display_name: string | null;
  login: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  role: string;
}

interface UserProps {
  block: {
    user: IUser;
    chatId: number;
  },
  btn: {
    iconClass: string;
    events?: {
      [key: string]: (event: Event) => void;
    },
  }
}

export class User extends Block {
  constructor(props: UserProps) {
    super('form', {
      block: {
        ...props.block,
        display_name_text: props.block.user.display_name || `${props.block.user.first_name}`,
      },
      attributes: {
        class: ['user'],
      },
      events: {
        ...props.btn.events,
      },
      components: {
        avatar: new Avatar({
          block: {
            src: props.block.user.avatar,
          },
        }),
        btnRemove: new ButtonIcon({
          block: {
            iconClass: props.btn.iconClass,
          },
        }),
      },
    });
  }

  mounted(): void {}

  render(): string {
    const user = Handlebars.compile(tmpl);

    return user(this.props.block);
  }
}
