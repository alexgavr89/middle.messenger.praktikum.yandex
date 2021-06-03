import Handlebars from 'handlebars';
import { Block } from '../../../../../modules/block';
import Button from '../../../../button';
import InputBlock from '../../../../input-block';
import UserController from '../../../../../controllers/UserController';
import tmpl from './tmpl';

export default class ProfileForm extends Block {
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

      button: new Button({
        title: 'Сохранить',
        type: 'submit',
        class: 'btn__form',
      }),

      events: {
        submit: (event) => {
          event.preventDefault();
          const {
            firstName,
            secondName,
            login,
            phone,
            mail,
          } = event.target.elements;

          UserController.changeProfile(
            {
              first_name: firstName.value,
              second_name: secondName.value,
              login: login.value,
              phone: phone.value,
              email: mail.value,
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
    const { firstName, secondName, phone, login, mail, button } = this.props;

    form.append(firstName.getContent());
    form.append(secondName.getContent());
    form.append(phone.getContent());
    form.append(login.getContent());
    form.append(mail.getContent());
    form.append(button.getContent());
  }
}
