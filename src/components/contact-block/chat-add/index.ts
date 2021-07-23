import { Block } from '../../../modules/block';
import ButtonIcon from '../../button-icon';
import { Input } from '../../input-block/input';
import ChatController from '../../../controllers/ChatController';

import tmpl from './tmpl';
import './style.scss';

interface ChatAddFilds extends HTMLFormControlsCollection {
  title: { value: string };
}

const chatController = new ChatController();

export default class ChatAdd extends Block {
  constructor() {
    super('form', {
      attributes: {
        class: ['chat-add'],
      },
      events: {
        submit: (event) => {
          event.preventDefault();

          if (event.target !== null && event.target instanceof HTMLFormElement) {
            const { title } = event.target.elements as ChatAddFilds;

            chatController.create(title.value);

            title.value = '';
          }
        },
      },
      components: {
        input: new Input({
          attributes: {
            name: 'title',
            type: 'text',
            placeholder: 'Название чата',
          },
        }),
        btn: new ButtonIcon({
          block: {
            iconClass: 'fas fa-comment-medical',
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
