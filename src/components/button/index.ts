import Handlebars from 'handlebars';
import { Block, Props } from '../../modules/block';
import tmpl from './tmpl';

import './style.scss';

interface ButtonProps extends Props {
  title: string;
  type: string;
  class?: string;
}

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super('div', { ...props, stylesWrap: ['btn'] });
  }

  compile(): string {
    const button = Handlebars.compile(tmpl);

    return button(this.props);
  }
}
