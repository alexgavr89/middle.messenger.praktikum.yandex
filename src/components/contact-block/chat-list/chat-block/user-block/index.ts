import { Block } from '../../../../../modules/block';
import Store from '../../../../../modules/store';
import UserList from './user-list';
import UserSearchBlock from './user-serch-block';

import tmpl from './tmpl';

interface UserBlockProps {
  chatId: number;
}

const store = Store.getInstance();

export default class UserBlock extends Block {
  constructor(props: UserBlockProps) {
    super('div', {
      block: {
        ...props,
      },
      components: {
        userSearchBlock: new UserSearchBlock({ chatId: props.chatId }),
        userList: new UserList({ chatId: props.chatId }),
      },
    });

    store.addEvent(`show.userBlock.${props.chatId}`, () => {
      if (store.get(`show.userBlock.${props.chatId}`)) {
        const userBlocks = store.get('show.userBlock');

        if (typeof userBlocks === 'object' && userBlocks !== null && !Array.isArray(userBlocks)) {
          for (const [key, value] of Object.entries(userBlocks)) {
            if (Number(key) !== props.chatId && value) {
              store.setProps({
                show: {
                  userBlock: {
                    [key]: false,
                  },
                },
              });
            }
          }

          this.display('block');
        }
      } else {
        this.display('none');
      }
    });
  }

  mounted(): void {
    this.display('none');

    store.setProps({
      show: {
        userBlock: {
          [`${this.props.block?.chatId}`]: false,
        },
      },
    });
  }

  render(): string {
    return tmpl;
  }
}
