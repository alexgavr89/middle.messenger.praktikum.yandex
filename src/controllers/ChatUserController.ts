import ChatUserAPI from '../api/ChatUserAPI';
import Store from '../modules/store';
import Router from '../modules/router';

const store = Store.getInstance();
const router = Router.getInstance();

type Indexed<T = unknown> = {
  [key: string]: T;
};

export default class ChatUserController {
  get(chatId: number): void {
    ChatUserAPI.get(chatId)
      .then((result) => {
        const users = JSON.parse(result.response);

        users.filter((user: Indexed) => user.id && user.id !== store.get('user.id'));

        store.setProps({ [`users_chat_${chatId}`]: users });

        return true;
      })
      .catch(() => {
        router.go('/server-error');
      });
  }

  remove(chatId: number, userId: number): void {
    ChatUserAPI.remove(chatId, userId)
      .then((result) => {
        if (result.status === 200) {
          this.get(chatId);
        }

        return true;
      })
      .catch(() => {
        router.go('/server-error');
      });
  }

  add(chatId: number, userId: number): void {
    ChatUserAPI.add(chatId, userId)
      .then((result) => {
        if (result.status === 200) {
          this.get(chatId);
        }

        return true;
      })
      .catch(() => {
        router.go('/server-error');
      });
  }
}
