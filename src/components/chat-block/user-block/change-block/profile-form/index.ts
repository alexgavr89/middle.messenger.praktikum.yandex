import { Block } from '../../../../../modules/block';
import Button from '../../../../button';
import InputBlock from '../../../../input-block';
import UserController from '../../../../../controllers/UserController';
import Store from '../../../../../modules/store';
import { IUser } from '../../../../../api/AuthAPI';
import { InputError } from '../../../../input-block/input-error';

import tmpl from './tmpl';

const store = Store.getInstance();
const userController = new UserController();

interface ProfileFilds extends HTMLFormControlsCollection {
  firstName: { value: string };
  secondName: { value: string };
  login: { value: string };
  phone: { value: string };
  mail: { value: string };
}

export default class ProfileForm extends Block {
  constructor() {
    const user = store.get('user') as IUser | undefined;

    super('form', {
      attributes: {
        class: ['change-form'],
      },
      events: {
        submit: (event) => {
          event.preventDefault();

          if (event.target !== null && event.target instanceof HTMLFormElement) {
            const {
              firstName,
              secondName,
              login,
              phone,
              mail,
            } = event.target.elements as ProfileFilds;

            try {
              userController.changeProfile({
                first_name: firstName.value,
                second_name: secondName.value,
                login: login.value,
                phone: phone.value,
                email: mail.value,
                display_name: `${firstName.value} ${secondName.value}`,
              });
            } catch (error) {
              if (error instanceof Error) {
                this.showError(error.message);
              }
            }
          }
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
                value: user?.first_name,
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
                value: user?.second_name,
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
                value: user?.phone,
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
                value: user?.login,
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
                value: user?.email,
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

  private showError(text: string) {
    switch (text) {
      case 'Пожалуйста, укажите номер телефона':
        this.showPhoneError(text);
        break;

      case 'Пожалуйста, укажите почту':
        this.showEmailError(text);
        break;

      default:
        break;
    }
  }

  private showPhoneError(text: string) {
    const { error } = this.props.components?.phone.props.components;

    error.print(text);

    this.clearError(error);
  }

  private showEmailError(text: string) {
    const { error } = this.props.components?.mail.props.components;

    error.print(text);

    this.clearError(error);
  }

  private clearError(blockError: InputError) {
    setTimeout(() => {
      blockError.clear();
    }, 5000);
  }
}
