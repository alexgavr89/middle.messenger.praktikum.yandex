import Handlebars from 'handlebars';
import { Block, Props } from '../../modules/block';
import tmpl from './tmpl';

import './style.scss';

interface IAvatarProps extends Props {
  src: string;
  alt?: string;
}

export default class Avatar extends Block {
  constructor(props: IAvatarProps) {
    super('div', { ...props, stylesWrap: ['avatar'] });
  }

  compile(): string {
    const avatar = Handlebars.compile(tmpl);

    if (this.props.src) {
      this.props.src = `https://ya-praktikum.tech/api/v2/resources/${this.props.src}`;
    } else {
      this.props.src = 'https://picsum.photos/50';
    }

    return avatar(this.props);
  }
}
