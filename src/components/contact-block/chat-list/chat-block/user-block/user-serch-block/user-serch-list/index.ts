import { Block } from '../../../../../../../modules/block';
import { User, IUser } from '../../user';
import Store from '../../../../../../../modules/store';
import ChatUserController from '../../../../../../../controllers/ChatUserController';

import tmpl from './tmpl';
import './style.scss';

const store = Store.getInstance();

interface UserSearchListProps {
  chatId: number;
}

const chatUserController = new ChatUserController();

export default class UserSearchList extends Block {
  constructor(props: UserSearchListProps) {
    super('div', {
      block: {
        ...props,
      },
      attributes: {
        class: ['user-list'],
      },
      list: {},
    });

    store.addEventChange(`users_search_list_${props.chatId}`, () => {
      const listBlock = this.createDocumentElement('div');
      const list = store.get(`users_search_list_${props.chatId}`) as IUser[] | undefined;

      if (list) {
        list.map((user) => {
          const userBlock = new User({
            block: {
              user,
              chatId: props.chatId,
            },
            btn: {
              iconClass: 'fas fa-user-plus',
              events: {
                submit: (event) => {
                  event.preventDefault();

                  chatUserController.add(props.chatId, user.id);

                  if (this.props.list) {
                    const { search } = this.props.list;

                    search.remove();
                  }
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
  }

  mounted(): void {}

  render(): string {
    return tmpl;
  }
}
