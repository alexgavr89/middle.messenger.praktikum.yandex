import { Block } from '../../../../../../../modules/block';
import ButtonIcon from '../../../../../../button-icon';
import { Input } from '../../../../../../input-block/input';
import UserController from '../../../../../../../controllers/UserController';

import tmpl from './tmpl';
import './style.scss';

interface UserSearchProps {
  chatId: number;
}

interface SearchFilds extends HTMLFormControlsCollection {
  login: { value: string };
}

const userController = new UserController();

export default class UserSearch extends Block {
  constructor(props: UserSearchProps) {
    super('form', {
      block: {
        chatId: props.chatId,
      },
      attributes: {
        class: ['user-search'],
      },
      events: {
        submit: (event) => {
          event.preventDefault();

          if (event.target !== null && event.target instanceof HTMLFormElement) {
            const { login } = event.target.elements as SearchFilds;

            userController.search(props.chatId, login.value);
          }
        },
      },
      components: {
        input: new Input({
          attributes: {
            name: 'login',
            type: 'text',
            placeholder: 'Поиск контактов',
          },
        }),
        btn: new ButtonIcon({
          block: {
            iconClass: 'fas fa-search',
          },
        }),
      },
    });
  }

  mounted(): void {}

  render(): string {
    return tmpl;
  }
}
