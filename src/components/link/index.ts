import Handlebars from 'handlebars';
import { Block } from '../../modules/block';

import tmpl from './tmpl';
import './style.scss';

interface LinkProps {
  block: {
    title: string;
    href?: string;
  },
  events: {
    [key: string]: (event: Event) => void;
  },
}

export default class Link extends Block {
  constructor(props: LinkProps) {
    super('div', {
      block: {
        ...props.block,
        class: 'link__a',
      },
      attributes: {
        class: ['link'],
      },
      events: {
        ...props.events,
      },
    });
  }

  mounted(): void {}

  render(): string {
    const link = Handlebars.compile(tmpl);

    return link(this.props.block);
  }
}
