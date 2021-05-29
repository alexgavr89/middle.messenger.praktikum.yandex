import { Block } from '../../../../modules/block';
import AvaratForm from './avatar-form';
import ProfileForm from './profile-form';
import PasswordForm from './password-form';

import './style.scss';

export default class ChangeBlock extends Block {
  constructor() {
    super('div', {
      avatarForm: new AvaratForm({}),

      profileForm: new ProfileForm(),

      passwordForm: new PasswordForm({}),

      stylesWrap: ['change-block'],
    });
  }

  update(): void {
    const { profileForm, passwordForm, avatarForm } = this.props;

    this.element.append(profileForm.getContent());
    this.element.append(passwordForm.getContent());
    this.element.append(avatarForm.getContent());
  }
}
