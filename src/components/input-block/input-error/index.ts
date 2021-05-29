import { readFileSync } from 'fs';
import Handlebars from 'handlebars';
import { Block, Props } from '../../../modules/block';

export interface IInputErrorProps extends Props {
  error: string;
}

export class InputError extends Block {
  constructor(props: IInputErrorProps) {
    super('div', props);
  }

  compile(): string {
    const tmpl = readFileSync(
      './src/components/input-block/input-error/tmpl.hbs',
      'utf8',
    );
    const inputError = Handlebars.compile(tmpl);

    return inputError(this.props);
  }
}
