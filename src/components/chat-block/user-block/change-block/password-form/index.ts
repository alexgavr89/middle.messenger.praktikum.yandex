import Handlebars from 'handlebars';
import { Block } from '../../../../../modules/block';
import Button from '../../../../button';
import InputBlock from '../../../../input-block';
import UserController from '../../../../../controllers/UserController';
import tmpl from './tmpl';

export default class PasswordForm extends Block {
  constructor() {
    super('div', {
      oldPassword: new InputBlock({
        label: {
          id: 'oldPassword',
          label: 'Старый пароль',
        },

        input: {
          id: 'oldPassword',
          name: 'oldPassword',
          type: 'password',
          placeholder: 'Старый пароль',
          events: {
            focus: () => {
              this.props.oldPassword.props.label.show();
            },
            blur: (event) => {
              if (event.target.value.length === 0) {
                this.props.oldPassword.props.label.hide();
              }
            },
          },
        },

        error: {
          error: 'Пожалуйста, укажите пароль длиннее 6 знаков',
        },
      }),

      newPassword: new InputBlock({
        label: {
          id: 'newPassword',
          label: 'Новый пароль',
        },

        input: {
          id: 'newPassword',
          name: 'newPassword',
          type: 'password',
          placeholder: 'Новый пароль',
          events: {
            focus: () => {
              this.props.newPassword.props.label.show();
            },
            blur: (event) => {
              if (event.target.value.length === 0) {
                this.props.newPassword.props.label.hide();
              }
            },
          },
        },

        error: {
          error: 'Пожалуйста, укажите пароль длиннее 6 знаков',
        },
      }),

      passwordButton: new Button({
        title: 'Изменить пароль',
        type: 'submit',
        class: 'btn__form',
        stylesWrap: ['btn'],
      }),

      events: {
        submit: (event) => {
          event.preventDefault();

          const { oldPassword, newPassword } = event.target.elements;

          UserController.changePassword(
            {
              oldPassword: oldPassword.value,
              newPassword: newPassword.value,
            },
            this,
          );
        },
      },

      stylesWrap: ['change-form'],
    });
  }

  compile(): string {
    const avatarForm = Handlebars.compile(tmpl);

    return avatarForm(this.props);
  }

  update(): void {
    const form = this.element.querySelector('form');
    const { oldPassword, newPassword, passwordButton } = this.props;

    form.append(oldPassword.getContent());
    form.append(newPassword.getContent());
    form.append(passwordButton.getContent());
  }
}
