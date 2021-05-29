import { readFileSync } from 'fs';
import Handlebars from 'handlebars';
import { Block } from '../../modules/block';
import InputBlock from '../input-block';
import Button from '../button';
import AuthController from '../../controllers/AuthController';

export default class FormLogin extends Block {
  constructor() {
    super('div', {
      login: new InputBlock({
        label: { id: 'login', label: 'Логин' },
        input: {
          id: 'login',
          name: 'login',
          type: 'text',
          placeholder: 'Логин',
          events: {
            focus: () => {
              this.props.login.props.label.show();
            },
            blur: (event) => {
              if (event.target.value.length === 0) {
                this.props.login.props.label.hide();
              }
            },
          },
        },
        error: { error: 'Пожалуйста, укажите логин' },
        stylesWrap: ['input-block'],
      }),

      password: new InputBlock({
        label: {
          id: 'password',
          label: 'Пароль',
        },
        input: {
          id: 'password',
          name: 'password',
          type: 'password',
          placeholder: 'Пароль',
          events: {
            focus: () => {
              this.props.password.props.label.show();
            },
            blur: (event) => {
              if (event.target.value.length === 0) {
                this.props.password.props.label.hide();
              }
            },
          },
        },
        error: { error: 'Пожалуйста, укажите пароль' },
        stylesWrap: ['input-block'],
      }),

      button: new Button({
        title: 'Далее',
        type: 'submit',
        class: 'btn__form',
      }),

      events: {
        submit: (event) => {
          event.preventDefault();
          const { login, password } = event.target.elements;

          AuthController.login(
            {
              login: login.value,
              password: password.value,
            },
            this,
          );
        },
      },
    });
  }

  compile(): string {
    const tmpl = readFileSync('./src/components/form-login/tmpl.hbs', 'utf8');
    const formBlock = Handlebars.compile(tmpl);

    return formBlock(this.props);
  }

  update(): void {
    const form = this.element.querySelector('form');

    form.append(this.props.login.getContent());
    form.append(this.props.password.getContent());
    form.append(this.props.button.getContent());
  }
}
