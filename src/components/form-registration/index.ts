import { readFileSync } from 'fs';
import Handlebars from 'handlebars';
import { Block } from '../../modules/block';
import InputBlock from '../input-block';
import Button from '../button';
import RegistrationController from '../../controllers/RegistrationController';

export default class FormRegistration extends Block {
  constructor() {
    super('div', {
      firstName: new InputBlock({
        label: {
          id: 'firstName',
          label: 'Имя',
        },
        input: {
          id: 'firstName',
          name: 'firstName',
          type: 'text',
          placeholder: 'Имя',
          events: {
            focus: () => {
              this.props.firstName.props.label.show();
            },
            blur: (event) => {
              if (event.target.value.length === 0) {
                this.props.firstName.props.label.hide();
              }
            },
          },
        },
        error: {
          error: 'Пожалуйста, укажите имя',
        },
      }),

      secondName: new InputBlock({
        label: {
          id: 'secondName',
          label: 'Фамилия',
        },
        input: {
          id: 'secondName',
          name: 'secondName',
          type: 'text',
          placeholder: 'Фамилия',
          events: {
            focus: () => {
              this.props.secondName.props.label.show();
            },
            blur: (event) => {
              if (event.target.value.length === 0) {
                this.props.secondName.props.label.hide();
              }
            },
          },
          stylesWrap: ['input-block'],
        },
        error: {
          error: 'Пожалуйста, укажите фамилию',
        },
      }),

      phone: new InputBlock({
        label: {
          id: 'phone',
          label: 'Телефон',
        },
        input: {
          id: 'phone',
          name: 'phone',
          type: 'text',
          placeholder: 'Телефон',
          events: {
            focus: () => {
              this.props.phone.props.label.show();
            },
            blur: (event) => {
              if (event.target.value.length === 0) {
                this.props.phone.props.label.hide();
              }
            },
          },
        },
        error: {
          error: 'Пожалуйста, укажите номер телефона',
        },
      }),

      login: new InputBlock({
        label: {
          id: 'login',
          label: 'Логин',
        },
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
        error: {
          error: 'Пожалуйста, укажите логин',
        },
      }),

      mail: new InputBlock({
        label: {
          id: 'mail',
          label: 'Почта',
        },
        input: {
          id: 'mail',
          name: 'mail',
          type: 'text',
          placeholder: 'Почта',
          events: {
            focus: () => {
              this.props.mail.props.label.show();
            },
            blur: (event) => {
              if (event.target.value.length === 0) {
                this.props.mail.props.label.hide();
              }
            },
          },
        },
        error: {
          error: 'Пожалуйста, укажите почту',
        },
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
        error: {
          error: 'Пожалуйста, укажите пароль длиннее 6 знаков',
        },
      }),

      confirmPassword: new InputBlock({
        label: {
          id: 'confirmPassword',
          label: 'Повторите пароль',
        },
        input: {
          id: 'confirmPassword',
          name: 'confirmPassword',
          type: 'password',
          placeholder: 'Повторите пароль',
          events: {
            focus: () => {
              this.props.confirmPassword.props.label.show();
            },
            blur: (event) => {
              if (event.target.value.length === 0) {
                this.props.confirmPassword.props.label.hide();
              }
            },
          },
        },
        error: {
          error: 'Пароли не совпадают',
        },
      }),

      button: new Button({
        title: 'Далее',
        type: 'submit',
        class: 'btn__form',
      }),

      events: {
        submit: (event) => {
          event.preventDefault();
          const {
            firstName,
            secondName,
            phone,
            login,
            mail,
            password,
            confirmPassword,
          } = event.target.elements;

          RegistrationController.registration(
            {
              first_name: firstName.value,
              second_name: secondName.value,
              phone: phone.value,
              login: login.value,
              email: mail.value,
              password: password.value,
              password_confirm: confirmPassword.value,
            },
            this,
          );
        },
      },
    });
  }

  compile(): string {
    const tmpl = readFileSync('./src/components/form-login/tmpl.hbs', 'utf8');
    const formRegistration = Handlebars.compile(tmpl);

    return formRegistration(this.props);
  }

  update(): void {
    const form = this.element.querySelector('form');
    const {
      firstName,
      secondName,
      phone,
      login,
      mail,
      password,
      button,
      confirmPassword,
    } = this.props;

    form.append(firstName.getContent());
    form.append(secondName.getContent());
    form.append(phone.getContent());
    form.append(login.getContent());
    form.append(mail.getContent());
    form.append(password.getContent());
    form.append(confirmPassword.getContent());
    form.append(button.getContent());
  }
}
