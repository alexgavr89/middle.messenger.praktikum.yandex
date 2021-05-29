import 'regenerator-runtime/runtime';
import ChatUserAPI from '../api/ChatUserAPI';
import Store from '../modules/store';
import ChatController from './ChatController';

const store = Store.getInstance({});

export default class ChatUserController {
  static get(chatId: number): void {
    ChatUserAPI.get(chatId).then((result) => {
      const users = JSON.parse(result.response).filter(
        (user) => user.id !== store.props.user.id,
      );

      store.setProps({ [`chatUsers_${chatId}`]: users });
    });
  }

  static remove(chatId: number, userId: number): void {
    ChatUserAPI.remove(chatId, userId).then((result) => {
      if (result.status === 200) {
        ChatUserController.get(chatId);
      }
    });
  }

  static add(chatId: number, userId: number): void {
    ChatUserAPI.add(chatId, userId).then((result) => {
      if (result.status === 200) {
        ChatController.get();
      }
    });
  }
}
