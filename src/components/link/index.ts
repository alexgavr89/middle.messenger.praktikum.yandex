import { readFileSync } from 'fs';
import Handlebars from 'handlebars';
import { Block, Props } from '../../modules/block';

import './style.scss';

interface LinkProps extends Props {
  title: string;
  href: string;
}

export default class Link extends Block {
  constructor(props: LinkProps) {
    super('div', { ...props, stylesWrap: ['link'] });
  }

  compile(): string {
    const tmpl = readFileSync('./src/components/link/tmpl.hbs', 'utf8');
    const button = Handlebars.compile(tmpl);

    return button(this.props);
  }
}
