import { Block } from '../../../../../modules/block';
import Button from '../../../../button';
import InputBlock from '../../../../input-block';
import UserController from '../../../../../controllers/UserController';
import { InputError } from '../../../../input-block/input-error';

import tmpl from './tmpl';

interface ProfileFilds extends HTMLFormControlsCollection {
  oldPassword: { value: string };
  newPassword: { value: string };
}

const userController = new UserController();

export default class PasswordForm extends Block {
  constructor() {
    super('form', {
      attributes: {
        class: ['change-form'],
      },
      events: {
        submit: (event) => {
          event.preventDefault();

          if (event.target !== null && event.target instanceof HTMLFormElement) {
            const { oldPassword, newPassword } = event.target.elements as ProfileFilds;

            try {
              userController.changePassword({
                oldPassword: oldPassword.value,
                newPassword: newPassword.value,
              });
            } catch (error) {
              if (error instanceof Error) {
                this.showError(error.message);
              }
            }
          }
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

  private showError(text: string) {
    switch (text) {
      case 'Error old password':
        this.showOldPasswordError('Пожалуйста, укажите пароль длиннее 6 знаков');
        break;

      case 'Error new password':
        this.showNewPasswordError('Пожалуйста, укажите пароль длиннее 6 знаков');
        break;

      default:
        break;
    }
  }

  private showOldPasswordError(text: string) {
    const { error } = this.props.components?.oldPassword.props.components;

    error.print(text);

    this.clearError(error);
  }

  private showNewPasswordError(text: string) {
    const { error } = this.props.components?.newPassword.props.components;

    error.print(text);

    this.clearError(error);
  }

  private clearError(blockError: InputError) {
    setTimeout(() => {
      blockError.clear();
    }, 5000);
  }
}
