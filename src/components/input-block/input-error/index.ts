import Handlebars from 'handlebars';
import { Block } from '../../../modules/block';

import tmpl from './tmpl';

export interface InputErrorProps {
  block: {
    error: string;
  }
}

export class InputError extends Block {
  constructor(props: InputErrorProps) {
    super('span', {
      ...props,
      attributes: {
        class: ['input-block__error'],
      },
    });
  }

  mounted(): void {
    this.visibility('hidden');
  }

  render(): string {
    const inputError = Handlebars.compile(tmpl);

    return inputError(this.props.block);
  }

  get(): string {
    return (this.props as InputErrorProps).block.error;
  }

  print(text: string): void {
    if (this.props.block) {
      this.props.block.error = text;
      this.visibility('visible');
    }
  }

  clear(): void {
    if (this.props.block) {
      this.visibility('hidden');
    }
  }
}
