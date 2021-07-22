import Handlebars from 'handlebars';
import { Block } from '../../../modules/block';
import tmpl from './tmpl';

export interface InputLabelProps {
  block: {
    label: string;
  },
  attributes: {
    for: string;
  }
}

export class InputLabel extends Block {
  constructor(props: InputLabelProps) {
    super('label', {
      block: props.block,
      attributes: {
        ...props.attributes,
        class: ['input-block__label'],
      },
    });
  }

  mounted(): void {
    this.visibility('hidden');
  }

  render(): string {
    const inputLabel = Handlebars.compile(tmpl);

    return inputLabel(this.props.block);
  }
}
