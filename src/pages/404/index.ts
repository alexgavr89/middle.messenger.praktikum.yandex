import { Block } from '../../modules/block';

import '../style.scss';

export default class NotFound extends Block {
  constructor() {
    super('div', {});
  }

  mounted(): void {}

  render(): string {
    return 'Errore 404';
  }
}
