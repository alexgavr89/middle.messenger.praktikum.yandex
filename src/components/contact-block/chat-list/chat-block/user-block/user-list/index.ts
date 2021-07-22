import { Block } from '../../../../../../modules/block';
import { User, IUser } from '../user';
import ChatUserController from '../../../../../../controllers/ChatUserController';
import Store from '../../../../../../modules/store';

import tmpl from './tmpl';
import './style.scss';

const store = Store.getInstance();

interface UserListProps {
  chatId: number;
}

type List = {
  [key: string]: IUser
};

export default class UserList extends Block {
  constructor(props: UserListProps) {
    super('div', {
      block: {
        ...props,
      },
      attributes: {
        class: ['user-list'],
      },
      list: {},
    });

    store.addEvent(`users_chat_${props.chatId}`, () => {
      const listBlock = this.createDocumentElement('div');
      const list = store.get(`users_chat_${props.chatId}`) as List;
      const userId = store.get('user.id');

      Object.keys(list).forEach((key) => {
        if (userId === list[key].id) {
          return;
        }

        const userBlock = new User({
          block: {
            user: {
              ...list[key],
            },
            chatId: props.chatId,
          },
          btn: {
            iconClass: 'fas fa-times-circle',
            events: {
              submit: (event) => {
                event.preventDefault();

                ChatUserController.remove(props.chatId, list[key].id);
              },
            },
          },
        });

        listBlock.append(userBlock.getContent());
      });

      this.setProps({
        list: {
          search: listBlock,
        },
      });
    });

    ChatUserController.get(props.chatId);
  }

  mounted(): void {}

  render(): string {
    return tmpl;
  }
}
