import { Block } from '../../../../../modules/block';
import Button from '../../../../button';
import InputBlock from '../../../../input-block';
import UserController from '../../../../../controllers/UserController';

import tmpl from './tmpl';

interface ProfileFilds extends HTMLFormControlsCollection {
  firstName: { value: string };
  secondName: { value: string };
  login: { value: string };
  phone: { value: string };
  mail: { value: string };
}

export default class ProfileForm extends Block {
  constructor() {
    super('form', {
      attributes: {
        class: ['change-form'],
      },
      events: {
        submit: (event) => {
          event.preventDefault();

          if (event.target === null || !(event.target instanceof HTMLFormElement)) {
            throw new Error(`${event} error`);
          }

          const {
            firstName,
            secondName,
            login,
            phone,
            mail,
          } = event.target.elements as ProfileFilds;

          UserController.changeProfile.call(this, {
            first_name: firstName.value,
            second_name: secondName.value,
            login: login.value,
            phone: phone.value,
            email: mail.value,
            display_name: `${firstName.value} ${secondName.value}`,
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
                error: '',
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
                error: '',
              },
            },
          },
        }),
        button: new Button({
          block: {
            title: 'Сохранить',
            type: 'submit',
            class: 'btn__form',
          },
        }),
      },
    });
  }

  mounted(): void {}

  render(): string {
    return tmpl;
  }
}
