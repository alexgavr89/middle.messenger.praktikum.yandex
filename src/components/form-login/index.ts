import Handlebars from 'handlebars';
import { Block } from '../../modules/block';
import InputBlock from '../input-block';
import Button from '../button';
import AuthController from '../../controllers/AuthController';
import { InputError } from '../input-block/input-error';

import tmpl from './tmpl';

interface LoginFilds extends HTMLFormControlsCollection {
  login: { value: string };
  password: { value: string };
}

const authController = new AuthController();

export default class FormLogin extends Block {
  constructor() {
    super('form', {
      events: {
        submit: (event) => {
          event.preventDefault();

          if (event.target !== null && event.target instanceof HTMLFormElement) {
            const { login, password } = event.target.elements as LoginFilds;

            try {
              authController.login({
                login: login.value,
                password: password.value,
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
        login: new InputBlock({
          block: {
            label: {
              block: {
                label: 'Логин',
              },
              attributes: {
                for: 'login',
              },
            },
            input: {
              attributes: {
                id: 'login',
                name: 'login',
                type: 'text',
                placeholder: 'Логин',
              },
            },
            error: {
              block: {
                error: '',
              },
            },
          },
        }),
        password: new InputBlock({
          block: {
            label: {
              block: {
                label: 'Пароль',
              },
              attributes: {
                for: 'password',
              },
            },
            input: {
              attributes: {
                id: 'password',
                name: 'password',
                type: 'password',
                placeholder: 'Пароль',
              },
            },
            error: {
              block: {
                error: '',
              },
            },
          },
        }),
        button: new Button({
          block: {
            title: 'Далее',
            type: 'submit',
            class: 'btn__form',
          },
        }),
      },
    });
  }

  mounted(): void {}

  render(): string {
    const formLogin = Handlebars.compile(tmpl);

    return formLogin({});
  }

  private showError(text: string) {
    switch (text) {
      case 'Пожалуйста, укажите имя':
        this.showLoginError(text);
        break;

      case 'Пожалуйста, укажите пароль' || 'Неправильный логин или пароль':
        this.showPasswordError(text);
        break;

      default:
        break;
    }
  }

  private showLoginError(text: string) {
    const { error } = this.props.components?.login.props.components;

    error.print(text);

    this.clearError(error);
  }

  private showPasswordError(text: string) {
    const { error } = this.props.components?.password.props.components;

    error.print(text);

    this.clearError(error);
  }

  private clearError(blockError: InputError) {
    setTimeout(() => {
      blockError.clear();
    }, 5000);
  }
}
