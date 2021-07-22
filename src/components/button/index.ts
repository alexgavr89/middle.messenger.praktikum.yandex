import Handlebars from 'handlebars';
import { Block } from '../../modules/block';

import tmpl from './tmpl';
import './style.scss';

interface ButtonProps {
  block: {
    title: string;
    type: string;
    class?: string;
  }
}

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super('div', {
      ...props,
      attributes: {
        class: ['btn'],
      },
    });
  }

  mounted(): void {}

  render(): string {
    const button = Handlebars.compile(tmpl);

    return button(this.props.block);
  }
}
