import { Block, Props } from '../../../../../modules/block';
import Store from '../../../../../modules/store';
import UserList from './user-list';
import UserSearchBlock from './user-serch-block';

interface IUserBlockProps extends Props {
  chatId: number;
  userList?: UserList;
  userSearchBlock?: UserSearchBlock;
}

const store = Store.getInstance({});

export default class UserBlock extends Block {
  constructor(props: IUserBlockProps) {
    super('div', {
      ...props,

      userList: new UserList({ chatId: props.chatId }),

      userSearchBlock: new UserSearchBlock({ chatId: props.chatId }),
    });
  }

  mounted(): void {
    store.registerEvent(`chatUsers_${this.props.chatId}`, (users) => {
      this.props.userList.setProps({ list: users, chatId: this.props.chatId });

      this.hidden(false);
    });

    this.hidden(true);
  }

  update(): void {
    const { userList, userSearchBlock } = this.props;

    this.element.append(userList.getContent());
    this.element.append(userSearchBlock.getContent());
  }
}
