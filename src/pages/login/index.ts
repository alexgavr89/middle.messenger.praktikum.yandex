import Handlebars from 'handlebars';
import { Block } from '../../modules/block';
import FormBlock from '../../components/form-block';
import FormLogin from '../../components/form-login';
import Link from '../../components/link';
import Router from '../../modules/router';

import tmpl from './tmpl';
import '../style.scss';

const router = Router.getInstance();

export default class Login extends Block {
  constructor() {
    super('div', {
      attributes: {
        class: ['app'],
      },
      components: {
        formBlock: new FormBlock({
          block: {
            title: 'Вход',
          },
          components: {
            form: new FormLogin(),
            link: new Link({
              block: {
                title: 'Нет аккаунта?',
              },
              events: {
                click: (event) => {
                  event.preventDefault();

                  router.go('/registration');
                },
              },
            }),
          },
        }),
      },
    });
  }

  mounted(): void {}

  render(): string {
    const login = Handlebars.compile(tmpl);

    return login({});
  }
}
