import Handlebars from 'handlebars';
import { Block } from '../../modules/block';
import FormBlock from '../../components/form-block';
import Link from '../../components/link';
import FormRegistration from '../../components/form-registration';
import Router from '../../modules/router';

import tmpl from './tmpl';
import '../style.scss';

const router = Router.getInstance();

export default class Registration extends Block {
  constructor() {
    super('div', {
      attributes: {
        class: ['app'],
      },
      components: {
        formBlock: new FormBlock({
          block: {
            title: 'Регистрация',
          },
          components: {
            form: new FormRegistration(),
            link: new Link({
              block: {
                title: 'Войти',
              },
              events: {
                click: (event) => {
                  event.preventDefault();

                  router.go('/login');
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
    const registration = Handlebars.compile(tmpl);

    return registration({});
  }
}
