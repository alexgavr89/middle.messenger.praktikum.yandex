import Handlebars from 'handlebars';
import { Block } from '../../modules/block';

import tmpl from './tmpl';
import './style.scss';

interface ButtonIconProps {
  block: {
    iconClass: string;
  },
  attributes?: {
    class: string[];
  },
  events?: {
    [key: string]: (event: Event) => void;
  },
}

export default class ButtonIcon extends Block {
  constructor(props: ButtonIconProps) {
    const attributeClass = ['button-icon'];

    if (props.attributes?.class) {
      attributeClass.push(...props.attributes.class);
    }

    super('button', {
      ...props,
      attributes: {
        class: attributeClass,
        type: 'submit',
      },
    });
  }

  mounted():void {}

  render(): string {
    const btnIcon = Handlebars.compile(tmpl);

    return btnIcon(this.props.block);
  }
}
