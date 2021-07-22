import { Block } from '../../modules/block';

export default class ServerError extends Block {
  constructor(text?: string) {
    super('div', {
      block: {
        text,
      },
    });
  }

  mounted(): void {}

  render(): string {
    if (typeof this.props.block?.text === 'string') {
      return this.props.block.text;
    }

    return 'Errore 500';
  }
}
