import { Block } from '../../../../../../../modules/block';
import { User, IUser } from '../../user';
import Store from '../../../../../../../modules/store';
import ChatUserController from '../../../../../../../controllers/ChatUserController';

import tmpl from './tmpl';
import './style.scss';

const store = Store.getInstance();

type List = {
  [key: string]: IUser
};

interface UserSearchListProps {
  chatId: number;
}

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

    store.addEvent(`users_search_list_${props.chatId}`, () => {
      const listBlock = this.createDocumentElement('div');
      const list = store.get(`users_search_list_${props.chatId}`) as List;

      Object.keys(list).forEach((key) => {
        const userBlock = new User({
          block: {
            user: {
              ...list[key],
            },
            chatId: props.chatId,
          },
          btn: {
            iconClass: 'fas fa-user-plus',
            events: {
              submit: (event) => {
                event.preventDefault();

                ChatUserController.add(props.chatId, list[key].id);

                if (this.props.list) {
                  const { search } = this.props.list;

                  search.remove();
                }
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
  }

  mounted(): void {}

  render(): string {
    return tmpl;
  }
}
