import Handlebars from 'handlebars';
import { Block } from '../../../modules/block';
import ButtonIcon from '../../button-icon';
import Avatar from '../../avatar';
import ChangeBlock from './change-block';
import LogoutController from '../../../controllers/LogoutController';
import Store from '../../../modules/store';
import tmpl from './tmpl';

import './style.scss';

const store = Store.getInstance();

export default class UserBlock extends Block {
  constructor() {
    super('div', {
      changeBlock: new ChangeBlock(),

      changeButton: new ButtonIcon({
        iconClass: 'fas fa-ellipsis-v',
        stylesWrap: ['button-icon'],
        events: {
          click: () => {
            if (this.props.changeBlock.meta.show) {
              this.props.changeBlock.hide();
            } else {
              this.props.changeBlock.show();
            }
          },
        },
      }),

      avatarUser: new Avatar({
        src: store.props.user.avatar || '',
      }),

      buttonLogout: new ButtonIcon({
        iconClass: 'fas fa-sign-out-alt',
        stylesWrap: ['button-icon', 'setting-button'],
        events: {
          click: () => {
            LogoutController.logout();
          },
        },
      }),
    });
  }

  mounted(): void {
    store.registerEvent('user', (user): void => {
      this.props.avatarUser.setProps({ src: user.avatar });
    });

    this.props.changeBlock.hide();
  }

  compile(): string {
    const settingBlock = Handlebars.compile(tmpl);

    return settingBlock(this.props);
  }

  update(): void {
    const contact = this.element.querySelector('.user-nav__setting');
    contact.append(this.props.changeButton.getContent());

    const user = this.element.querySelector('.user-nav__avatar');

    if (store.props.user.avatar) {
      user.append(this.props.avatarUser.getContent());
    }

    user.append(this.props.buttonLogout.getContent());

    this.element.append(this.props.changeBlock.getContent());
  }
}
