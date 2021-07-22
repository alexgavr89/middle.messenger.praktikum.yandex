import ChatAPI from '../api/ChatAPI';
import Store from '../modules/store';
import Validate from '../utils/validate';
import Router from '../modules/router';

const store = Store.getInstance();
const router = Router.getInstance();

export default class ChatController {
  static get(): void {
    ChatAPI.get()
      .then((result) => {
        store.setProps({ chats: JSON.parse(result.response).reverse() });

        return true;
      })
      .catch(() => {
        router.go('/server-error');
      });
  }

  static create(title: string): void {
    if (Validate.isNotEmpty(title)) {
      ChatAPI.create(title)
        .then((result) => {
          if (result.status === 200) {
            ChatController.get();
          }

          return true;
        })
        .catch(() => {
          router.go('/server-error');
        });
    }
  }
}
