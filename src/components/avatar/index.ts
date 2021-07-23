import Handlebars from 'handlebars';
import { Block } from '../../modules/block';

import tmpl from './tmpl';
import './style.scss';

interface AvatarProps {
  block: {
    src: string | null;
    alt?: string;
  }
}

export default class Avatar extends Block {
  constructor(props: AvatarProps) {
    super('div', {
      ...props,
      attributes: {
        class: ['avatar'],
      },
    });
  }

  mounted():void {}

  render(): string {
    const avatar = Handlebars.compile(tmpl);

    return avatar({
      path: this.createPath(this.props.block?.src as string | null),
      ...this.props.block,
    });
  }

  private createPath(value?: string | null): string {
    if (value) {
      return `https://ya-praktikum.tech/api/v2/resources/${value}`;
    }
    return 'https://picsum.photos/50';
  }
}
