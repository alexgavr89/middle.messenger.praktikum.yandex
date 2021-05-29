import { readFileSync } from 'fs';
import Handlebars from 'handlebars';
import { Block, Props } from '../../modules/block';

import './style.scss';
import '@fortawesome/fontawesome-free/css/all.css';

interface IButtonIconProps extends Props {
  iconClass: string;
}

export default class ButtonIcon extends Block {
  constructor(props: IButtonIconProps) {
    super('div', { ...props, stylesWrap: ['button-icon'] });
  }

  compile(): string {
    const tmpl = readFileSync('./src/components/button-icon/tmpl.hbs', 'utf8');
    const btnIcon = Handlebars.compile(tmpl);

    return btnIcon(this.props);
  }
}
