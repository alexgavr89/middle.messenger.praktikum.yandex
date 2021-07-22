import { Block } from '../../../modules/block';
import ButtonIcon from '../../button-icon';
import WebSocketController from '../../../controllers/WebSocketController';
import Store from '../../../modules/store';

import tmpl from './tmpl';
import './style.scss';

const store = Store.getInstance();

export default class SendBlock extends Block {
  private ws: WebSocketController | undefined;

  constructor() {
    super('form', {
      attributes: {
        class: ['send-block'],
      },
      events: {
        submit: (event) => {
          event.preventDefault();

          if (event.target === null || !(event.target instanceof HTMLFormElement)) {
            throw new Error(`${event} error`);
          }

          const { message } = event.target.elements;

          if (this.ws) {
            this.ws.send(message.value);
          }

          message.value = '';
        },
      },
      components: {
        btnAdd: new ButtonIcon({
          block: {
            iconClass: 'fas fa-paperclip',
          },
        }),
        btnSmile: new ButtonIcon({
          block: {
            iconClass: 'far fa-smile',
          },
        }),
        btnSend: new ButtonIcon({
          block: {
            iconClass: 'fas fa-paper-plane',
          },
        }),
      },
    });

    store.addEvent('event.click.chat', () => {
      const chatId = store.get('event.click.chat');

      if (typeof chatId === 'number') {
        this.ws = new WebSocketController(chatId);
      }
    });
  }

  mounted(): void {}

  render(): string {
    return tmpl;
  }
}
