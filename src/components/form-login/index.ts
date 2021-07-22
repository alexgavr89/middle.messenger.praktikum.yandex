import Handlebars from 'handlebars';
import { Block } from '../../modules/block';
import InputBlock from '../input-block';
import Button from '../button';
import AuthController from '../../controllers/AuthController';

import tmpl from './tmpl';

interface LoginFilds extends HTMLFormControlsCollection {
  login: { value: string };
  password: { value: string };
}

export default class FormLogin extends Block {
  constructor() {
    super('form', {
      events: {
        submit: (event) => {
          event.preventDefault();

          if (event.target === null || !(event.target instanceof HTMLFormElement)) {
            throw new Error(`${event} error`);
          }

          const { login, password } = event.target.elements as LoginFilds;

          AuthController.login.call(this, {
            login: login.value,
            password: password.value,
          });
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
}
