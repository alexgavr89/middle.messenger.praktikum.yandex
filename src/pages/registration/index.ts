import { Block } from '../../modules/block';
import FormBlock from '../../components/form-block';
import Link from '../../components/link';
import FormRegistration from '../../components/form-registration';
import Router from '../../modules/router';

const router = Router.getInstance();

export default class Registration extends Block {
  private constructor() {
    super('div', {
      formBlock: new FormBlock({
        title: 'Регистрация',
        form: new FormRegistration(),
        link: new Link({
          title: 'Войти',
          href: 'index.html',
          events: {
            click: (event) => {
              event.preventDefault();

              router.go('/login');
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
