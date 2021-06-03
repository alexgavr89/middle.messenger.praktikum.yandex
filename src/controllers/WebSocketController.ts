import 'regenerator-runtime/runtime';
import ChatAPI from '../api/ChatAPI';
import Store from '../modules/store';
import Validate from '../utils/validate';
import escape from '../utils/escape';
import Router from '../modules/router';

const store = Store.getInstance();
const router = Router.getInstance();

export default class WebSocketController {
  static connect(chatId: number): void {
    ChatAPI.getToken(chatId)
      .then((result) => {
        store.setProps({ messages: null });
        store.setProps({ socket: null });

        if (result.status === 200) {
          const response = JSON.parse(result.response);

          const socket = new WebSocket(
            `wss://ya-praktikum.tech/ws/chats/${store.props.user.id}/${chatId}/${response.token}`,
          );

          store.setProps({ socket });

          socket.addEventListener('open', () => {
            socket.send(
              JSON.stringify({
                content: '0',
                type: 'get old',
              }),
            );
          });

          socket.addEventListener('message', (event) => {
            if (store.props.messages) {
              const message = JSON.parse(event.data);

              if (message.type !== 'user connected') {
                const { messages } = store.props;
                messages.push(message);

                store.setProps({ messages });
              }
            } else {
              store.setProps({ messages: JSON.parse(event.data).reverse() });
            }
          });
        }

        return true;
      })
      .catch(() => {
        router.go('/server-error');
      });
  }

  static send(message: string): void {
    if (store.props.socket && Validate.isNotEmpty(message)) {
      store.props.socket.send(
        JSON.stringify({
          content: escape(message),
          type: 'message',
        }),
      );
    }
  }

  static get(): void {
    store.props.socket.send(
      JSON.stringify({
        content: '10',
        type: 'get old',
      }),
    );
  }
}
