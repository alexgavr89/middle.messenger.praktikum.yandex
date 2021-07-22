import ChatAPI from '../api/ChatAPI';
import Store from '../modules/store';
import Validate from '../utils/validate';
import escape from '../utils/escape';
import Router from '../modules/router';
import { IUser } from '../api/AuthAPI';

const store = Store.getInstance();
const router = Router.getInstance();

export default class WebSocketController {
  private chatId: number;

  private ws: WebSocket | undefined;

  constructor(chatId: number) {
    this.chatId = chatId;

    this.connect()
      .then((response) => {
        this.ws = response;

        return true;
      })
      .catch(() => {
        router.go('/server-error');
      });
  }

  async connect(): Promise<WebSocket> {
    const result = await ChatAPI.getToken(this.chatId);

    if (result.status === 200) {
      const response = JSON.parse(result.response);

      const { id } = store.get('user') as IUser;

      const socket = await new WebSocket(
        `wss://ya-praktikum.tech/ws/chats/${id}/${this.chatId}/${response.token}`,
      );

      socket.addEventListener('open', () => {
        socket.send(
          JSON.stringify({
            content: '0',
            type: 'get old',
          }),
        );
      });

      socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);

        if (Array.isArray(data)) {
          store.setProps({
            messages: data.reverse(),
          });
        }

        if (data !== null && !Array.isArray(data) && typeof data === 'object') {
          if (data.type !== 'user connected') {
            const messages = store.get('messages');

            if (Array.isArray(messages)) {
              store.setProps({
                messages: [...messages, data],
              });
            }
          }
        }
      });

      return socket;
    }

    throw new Error('WebSocket connect error');
  }

  send(message: string): void {
    if (this.ws instanceof WebSocket && Validate.isNotEmpty(message)) {
      if (!this.ws.readyState) {
        setTimeout(() => {
          this.send(message);
        }, 100);
      } else {
        this.ws.send(
          JSON.stringify({
            content: escape(message),
            type: 'message',
          }),
        );
      }
    }
  }

  get(): void {
    if (this.ws instanceof WebSocket) {
      if (!this.ws.readyState) {
        setTimeout(() => {
          this.get();
        }, 100);
      } else {
        this.ws.send(
          JSON.stringify({
            content: '10',
            type: 'get old',
          }),
        );
      }
    }
  }
}
