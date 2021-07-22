import { Block } from '../../../../modules/block';
import AvaratForm from './avatar-form';
import ProfileForm from './profile-form';
import PasswordForm from './password-form';

import tmpl from './tmpl';
import './style.scss';

export default class ChangeBlock extends Block {
  constructor() {
    super('div', {
      attributes: {
        class: ['change-block'],
      },
      components: {
        avatarForm: new AvaratForm(),
        profileForm: new ProfileForm(),
        passwordForm: new PasswordForm(),
      },
    });
  }

  mounted(): void {
    this.visibility('hidden');
  }

  render(): string {
    return tmpl;
  }

  toggleVisibility(): void {
    if (this.element.style.cssText === 'visibility: hidden;') {
      this.visibility('visible');
    } else {
      this.visibility('hidden');
    }
  }
}
