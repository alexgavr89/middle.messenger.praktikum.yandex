import Handlebars from 'handlebars';
import { Block } from '../../modules/block';
import InputBlock from '../input-block';
import Button from '../button';
import RegistrationController from '../../controllers/RegistrationController';
import tmpl from './tmpl';

interface RegistrationFilds extends HTMLFormControlsCollection {
  firstName: { value: string };
  secondName: { value: string };
  phone: { value: string };
  login: { value: string };
  mail: { value: string };
  password: { value: string };
  confirmPassword: { value: string };
}

export default class FormRegistration extends Block {
  constructor() {
    super('form', {
      events: {
        submit: (event) => {
          event.preventDefault();

          if (event.target === null || !(event.target instanceof HTMLFormElement)) {
            throw new Error(`${event} error`);
          }

          const {
            firstName,
            secondName,
            phone,
            login,
            mail,
            password,
            confirmPassword,
          } = event.target.elements as RegistrationFilds;

          RegistrationController.registration.call(this, {
            first_name: firstName.value,
            second_name: secondName.value,
            phone: phone.value,
            login: login.value,
            email: mail.value,
            password: password.value,
            password_confirm: confirmPassword.value,
          });
        },
      },
      components: {
        firstName: new InputBlock({
          block: {
            label: {
              block: {
                label: 'Имя',
              },
              attributes: {
                for: 'firstName',
              },
            },
            input: {
              attributes: {
                id: 'firstName',
                name: 'firstName',
                type: 'text',
                placeholder: 'Имя',
              },
            },
            error: {
              block: {
                error: '',
              },
            },
          },
        }),
        secondName: new InputBlock({
          block: {
            label: {
              block: {
                label: 'Фамилия',
              },
              attributes: {
                for: 'secondName',
              },
            },
            input: {
              attributes: {
                id: 'secondName',
                name: 'secondName',
                type: 'text',
                placeholder: 'Фамилия',
              },
            },
            error: {
              block: {
                error: '',
              },
            },
          },
        }),
        phone: new InputBlock({
          block: {
            label: {
              block: {
                label: 'Телефон',
              },
              attributes: {
                for: 'phone',
              },
            },
            input: {
              attributes: {
                id: 'phone',
                name: 'phone',
                type: 'text',
                placeholder: 'Телефон',
              },
            },
            error: {
              block: {
                error: '',
              },
            },
          },
        }),
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
                error: 'Пожалуйста, укажите логин',
              },
            },
          },
        }),
        mail: new InputBlock({
          block: {
            label: {
              block: {
                label: 'Почта',
              },
              attributes: {
                for: 'mail',
              },
            },
            input: {
              attributes: {
                id: 'mail',
                name: 'mail',
                type: 'text',
                placeholder: 'Почта',
              },
            },
            error: {
              block: {
                error: 'Пожалуйста, укажите почту',
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
                error: 'Пожалуйста, укажите пароль длиннее 6 знаков',
              },
            },
          },
        }),
        confirmPassword: new InputBlock({
          block: {
            label: {
              block: {
                label: 'Повторите пароль',
              },
              attributes: {
                for: 'confirmPassword',
              },
            },
            input: {
              attributes: {
                id: 'confirmPassword',
                name: 'confirmPassword',
                type: 'password',
                placeholder: 'Повторите пароль',
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
    const formRegistration = Handlebars.compile(tmpl);

    return formRegistration({});
  }
}
