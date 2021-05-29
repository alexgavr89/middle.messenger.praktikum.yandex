import { readFileSync } from 'fs';
import Handlebars from 'handlebars';
import { Block, Props } from '../../modules/block';

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
    const tmpl = readFileSync('./src/components/button/tmpl.hbs', 'utf8');
    const button = Handlebars.compile(tmpl);

    return button(this.props);
  }
}
