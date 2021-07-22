import { Block } from '../../../../../../modules/block';
import Store from '../../../../../../modules/store';
import UserSearch from './user-search';
import UserSearchList from './user-serch-list';

import tmpl from './tmpl';
import './style.scss';

interface IUserSearchBlockProps {
  chatId: number;
}

const store = Store.getInstance();

export default class UserSearchBlock extends Block {
  constructor(props: IUserSearchBlockProps) {
    super('div', {
      block: {
        ...props,
      },
      attributes: {
        class: ['user-search-block'],
      },
      components: {
        userSearch: new UserSearch({ chatId: props.chatId }),
        userSearchList: new UserSearchList({ chatId: props.chatId }),
      },
    });

    if (this.props.block?.chatId) {
      store.addEvent(`users_${this.props.block.chatId}`, (users) => {
        if (this.props.components?.userSearchList) {
          this.props.components.userSearchList.setProps({ list: users });
        }
      });
    }
  }

  mounted(): void {}

  render(): string {
    return tmpl;
  }
}
