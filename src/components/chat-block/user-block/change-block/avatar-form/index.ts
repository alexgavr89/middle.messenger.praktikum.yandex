import Handlebars from 'handlebars';
import { Block, Props } from '../../../../../modules/block';
import { Input } from '../../../../input-block/input';
import Button from '../../../../button';
import UserController from '../../../../../controllers/UserController';
import tmpl from './tmpl';

export default class AvaratForm extends Block {
  constructor(props?: Props) {
    super('div', {
      ...props,

      avatar: new Input({
        id: 'avatar',
        name: 'avatar',
        type: 'file',
        placeholder: 'Аватар',
        stylesWrap: ['input-block'],
      }),

      button: new Button({
        title: 'Изменить аватар',
        type: 'submit',
        class: 'btn__form',
        stylesWrap: ['btn'],
      }),

      events: {
        submit: (event) => {
          event.preventDefault();

          const form = this.element.querySelector('form');

          UserController.changeAvatar(form);
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
    const { avatar, button } = this.props;

    form.append(avatar.getContent());
    form.append(button.getContent());
  }
}
