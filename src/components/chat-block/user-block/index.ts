import { Block } from '../../../modules/block';
import ButtonIcon from '../../button-icon';
import Avatar from '../../avatar';
import ChangeBlock from './change-block';
import LogoutController from '../../../controllers/LogoutController';
import Store from '../../../modules/store';

import tmpl from './tmpl';
import './style.scss';

const store = Store.getInstance();
const logoutController = new LogoutController();

export default class UserBlock extends Block {
  constructor() {
    super('div', {
      components: {
        changeButton: new ButtonIcon({
          block: {
            iconClass: 'fas fa-ellipsis-v',
          },
          events: {
            click: () => {
              if (this.props.components?.changeBlock instanceof ChangeBlock) {
                this.props.components?.changeBlock.toggleVisibility();
              }
            },
          },
        }),
        avatarUser: new Avatar({
          block: {
            src: store.get('user.avatar') as string | null,
          },
        }),
        buttonLogout: new ButtonIcon({
          block: {
            iconClass: 'fas fa-sign-out-alt',
          },
          attributes: {
            class: ['setting-button'],
          },
          events: {
            click: () => {
              logoutController.logout();
            },
          },
        }),
        changeBlock: new ChangeBlock(),
      },
    });

    store.addEventChange('user.avatar', (): void => {
      if (this.props.components) {
        this.props.components.avatarUser.setProps({
          block: {
            src: store.get('user.avatar'),
          },
        });
      }
    });
  }

  mounted(): void {}

  render(): string {
    return tmpl;
  }
}
