import { Block } from '../../../../../modules/block';
import { Input } from '../../../../input-block/input';
import Button from '../../../../button';
import UserController from '../../../../../controllers/UserController';

import tmpl from './tmpl';

const userController = new UserController();

export default class AvaratForm extends Block {
  constructor() {
    super('form', {
      attributes: {
        class: ['change-form'],
      },
      components: {
        avatar: new Input({
          attributes: {
            name: 'avatar',
            type: 'file',
            placeholder: 'Аватар',
          },
        }),
        button: new Button({
          block: {
            title: 'Изменить аватар',
            type: 'submit',
            class: 'btn__form',
          },
        }),
      },
      events: {
        submit: (event) => {
          event.preventDefault();

          if (event.target !== null && event.target instanceof HTMLFormElement) {
            const form = event.target;

            if (form instanceof HTMLFormElement) {
              userController.changeAvatar(form);
            }
          }
        },
      },

    });
  }

  mounted(): void {}

  render(): string {
    return tmpl;
  }
}
