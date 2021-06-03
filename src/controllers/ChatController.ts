import 'regenerator-runtime/runtime';
import ChatAPI from '../api/ChatAPI';
import Store from '../modules/store';
import { Block } from '../modules/block';
import Validate from '../utils/validate';
import Router from '../modules/router';

const store = Store.getInstance();
const router = Router.getInstance();

export default class ChatController {
  static get(): void {
    ChatAPI.get()
      .then((result) => {
        store.setProps({ chats: JSON.parse(result.response) });

        return true;
      })
      .catch(() => {
        router.go('/server-error');
      });
  }

  static crete(block: Block): void {
    const input = store.props.addChatInput as string;

    if (Validate.isNotEmpty(input)) {
      ChatAPI.create(input)
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

    block.props.title.setProps({});
  }
}
