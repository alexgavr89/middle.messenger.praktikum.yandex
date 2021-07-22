import Handlebars from 'handlebars';
import { Block } from '../../modules/block';
import MessengerBlock from '../../components/messenger-block';
import tmpl from './tmpl';
import '../style.scss';

export default class Messenger extends Block {
  constructor() {
    super('div', {
      attributes: {
        class: ['app'],
      },
      components: {
        messengerBlock: new MessengerBlock(),
      },
    });
  }

  mounted(): void {}

  render(): string {
    const login = Handlebars.compile(tmpl);

    return login({});
  }
}
