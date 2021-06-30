import { Block, Props } from '../../../../../../modules/block';
import Store from '../../../../../../modules/store';
import UserSearch from './user-search';
import UserSearchList from './user-serch-list';

import './style.scss';

interface IUserSearchBlockProps extends Props {
  chatId: number;
}

const store = Store.getInstance();

export default class UserSearchBlock extends Block {
  constructor(props: IUserSearchBlockProps) {
    super('div', {
      ...props,

      userSearch: new UserSearch({ chatId: props.chatId }),

      userSearchList: new UserSearchList({ chatId: props.chatId }),

      stylesWrap: ['user-search-block'],
    });
  }

  mounted(): void {
    store.registerEvent(`users_${this.props.chatId}`, (users) => {
      this.props.userSearchList.setProps({ list: users });
    });
  }

  update(): void {
    const { userSearch, userSearchList } = this.props;

    this.element.append(userSearch.getContent());
    this.element.append(userSearchList.getContent());
  }
}
