import { Block, Props } from '../../../../../../../modules/block';
import { User, IUser } from '../../user';
import ChatUserController from '../../../../../../../controllers/ChatUserController';

import './style.scss';

interface IUserSearchListProps extends Props {
  chatId: number;
  list?: IUser[];
}

export default class UserSearchList extends Block {
  constructor(props: IUserSearchListProps) {
    super('div', { ...props, stylesWrap: ['user-list'] });
  }

  update(): void {
    if (this.props.list) {
      this.props.list.forEach((element) => {
        const user = new User({
          ...element,
          btnIconClass: 'fas fa-user-plus',
          events: {
            click: () => {
              ChatUserController.add(this.props.chatId as number, element.id);
            },
          },
        });

        this.element.append(user.getContent());
      });
    }
  }
}
