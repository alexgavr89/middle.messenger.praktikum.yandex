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

const chatUserController = new ChatUserController();

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

    store.addEventChange(`users_chat_${props.chatId}`, () => {
      const listBlock = this.createDocumentElement('div');
      const list = store.get(`users_chat_${props.chatId}`) as IUser[] | undefined;
      const userId = store.get('user.id');

      if (list) {
        list
          .filter((user) => userId !== user.id)
          .map((user) => {
            const userBlock = new User({
              block: {
                user,
                chatId: props.chatId,
              },
              btn: {
                iconClass: 'fas fa-times-circle',
                events: {
                  submit: (event) => {
                    event.preventDefault();

                    chatUserController.remove(props.chatId, user.id);
                  },
                },
              },
            });

            listBlock.append(userBlock.getContent());

            return user;
          });
      }

      this.setProps({
        list: {
          search: listBlock,
        },
      });
    });

    chatUserController.get(props.chatId);
  }

  mounted(): void {}

  render(): string {
    return tmpl;
  }
}
