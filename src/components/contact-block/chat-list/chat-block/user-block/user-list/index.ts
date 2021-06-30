import { Block, Props } from '../../../../../../modules/block';
import { User, IUser } from '../user';
import ChatUserController from '../../../../../../controllers/ChatUserController';

import './style.scss';

interface IUserListProps extends Props {
  chatId: number;
  list?: IUser[];
}

export default class UserList extends Block {
  constructor(props: IUserListProps) {
    super('div', { ...props, stylesWrap: ['user-list'] });
  }

  update(): void {
    if (this.props.list) {
      this.props.list.forEach((element) => {
        const user = new User({
          ...element,
          btnIconClass: 'far fa-times-circle',
          events: {
            click: () => {
              ChatUserController.remove(this.props.chatId, element.id);
            },
          },
        });

        this.element.append(user.getContent());
      });
    }
  }
}
