import 'regenerator-runtime/runtime';
import ChatAPI from '../api/ChatAPI';
import Store from '../modules/store';
import { Block } from '../modules/block';
import Validate from '../utils/validate';

const store = Store.getInstance({});

export default class ChatController {
  static get(): void {
    ChatAPI.get().then((result) => {
      store.setProps({ chats: JSON.parse(result.response) });
    });
  }

  static crete(block: Block): void {
    const input = store.props.addChatInput as string;

    if (Validate.isNotEmpty(input)) {
      ChatAPI.create(input).then((result) => {
        if (result.status === 200) {
          ChatController.get();
        }
      });
    }

    block.props.title.setProps({});
  }
}
