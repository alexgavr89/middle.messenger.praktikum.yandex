import { Block } from '../../../modules/block';

import './stype.scss';

export interface InputProps {
  attributes: {
    name: string;
    type: string;
    placeholder: string;
    id?: string;
    value?: string;
  },
  events?: {
    [key: string]: (event: Event) => void;
  }
}

export class Input extends Block {
  constructor(props: InputProps) {
    super('input', {
      attributes: {
        ...props.attributes,
        class: ['input'],
        autocomplete: 'off',
      },
      events: props.events,
    });
  }

  mounted(): void {}

  render(): void {}
}
