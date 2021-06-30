import { v4 as makeUUID } from 'uuid';
import { Block, Props } from '../../../../../../../modules/block';
import ButtonIcon from '../../../../../../button-icon';
import { Input } from '../../../../../../input-block/input';
import UserController from '../../../../../../../controllers/UserController';
import Store from '../../../../../../../modules/store';

import './style.scss';

const store = Store.getInstance();

interface IUserSearchProps extends Props {
  chatId: number;
}

export default class UserSearch extends Block {
  constructor(props: IUserSearchProps) {
    super('div', {
      ...props,

      title: new Input({
        id: makeUUID(),
        name: 'userSearchInput',
        type: 'text',
        placeholder: 'Поиск контактов',
        stylesWrap: ['input-block'],
        events: {
          change: (event) => {
            store.setProps({ searchUserInput: event.target.value });
          },
        },
      }),

      btn: new ButtonIcon({
        iconClass: 'fas fa-search',
        stylesWrap: ['button-icon'],
        events: {
          click: () => {
            UserController.search(this.props.chatId);
          },
        },
      }),

      stylesWrap: ['user-search'],
    });
  }

  update(): void {
    const { title, btn } = this.props;

    this.element.append(title.getContent());
    this.element.append(btn.getContent());
  }
}
