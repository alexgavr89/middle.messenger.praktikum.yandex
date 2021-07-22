import { Block } from '../../../../../modules/block';
import Button from '../../../../button';
import InputBlock from '../../../../input-block';
import UserController from '../../../../../controllers/UserController';

import tmpl from './tmpl';

interface ProfileFilds extends HTMLFormControlsCollection {
  oldPassword: { value: string };
  newPassword: { value: string };
}

export default class PasswordForm extends Block {
  constructor() {
    super('form', {
      attributes: {
        class: ['change-form'],
      },
      events: {
        submit: (event) => {
          event.preventDefault();

          if (event.target === null || !(event.target instanceof HTMLFormElement)) {
            throw new Error(`${event} error`);
          }

          const { oldPassword, newPassword } = event.target.elements as ProfileFilds;

          UserController.changePassword.call(this, {
            oldPassword: oldPassword.value,
            newPassword: newPassword.value,
          });
        },
      },
      components: {
        oldPassword: new InputBlock({
          block: {
            label: {
              block: {
                label: 'Старый пароль',
              },
              attributes: {
                for: 'oldPassword',
              },
            },
            input: {
              attributes: {
                id: 'oldPassword',
                name: 'oldPassword',
                type: 'password',
                placeholder: 'Старый пароль',
              },
            },
            error: {
              block: {
                error: '',
              },
            },
          },
        }),
        newPassword: new InputBlock({
          block: {
            label: {
              block: {
                label: 'Новый пароль',
              },
              attributes: {
                for: 'newPassword',
              },
            },
            input: {
              attributes: {
                id: 'newPassword',
                name: 'newPassword',
                type: 'password',
                placeholder: 'Новый пароль',
              },
            },
            error: {
              block: {
                error: '',
              },
            },
          },
        }),
        passwordButton: new Button({
          block: {
            title: 'Изменить пароль',
            type: 'submit',
            class: 'btn__form',
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
