import { Block } from '../../modules/block';
import FormBlock from '../../components/form-block';
import FormLogin from '../../components/form-login';
import Link from '../../components/link';
import Router from '../../modules/router';

import '../style.scss';

const router = Router.getInstance();

export default class Login extends Block {
  constructor() {
    super('div', {
      formBlock: new FormBlock({
        title: 'Вход',
        form: new FormLogin(),

        link: new Link({
          title: 'Нет аккаунта?',
          href: 'registration.html',
          events: {
            click: (event) => {
              event.preventDefault();

              router.go('/registration');
            },
          },
        }),
      }),

      stylesWrap: ['app'],

      setting: {
        uuid: true,
      },
    });
  }

  update(): void {
    this.element.append(this.props.formBlock.getContent());
  }
}
