import { Block } from '../../../modules/block';
import ButtonIcon from '../../button-icon';
import { Input } from '../../input-block/input';
import ChatController from '../../../controllers/ChatController';
import Store from '../../../modules/store';
import escape from '../../../utils/escape';

import './style.scss';

const store = Store.getInstance();

export default class ChatAdd extends Block {
  constructor() {
    super('div', {
      title: new Input({
        id: 'title',
        name: 'title',
        type: 'text',
        placeholder: 'Название чата',
        stylesWrap: ['input-block'],
        events: {
          change: (event) => {
            store.setProps({ addChatInput: escape(event.target.value) });
          },
        },
      }),

      btn: new ButtonIcon({
        iconClass: 'fas fa-comment-medical',
        stylesWrap: ['button-icon'],
        events: {
          click: () => {
            ChatController.crete(this);
          },
        },
      }),

      stylesWrap: ['chat-add'],
    });
  }

  update(): void {
    this.element.append(this.props.title.getContent());
    this.element.append(this.props.btn.getContent());
  }
}
