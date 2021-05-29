import { readFileSync } from 'fs';
import Handlebars from 'handlebars';
import { Block, Props } from '../../../modules/block';

export interface IInputLabelProps extends Props {
  id: string;
  label: string;
}

export class InputLabel extends Block {
  constructor(props: IInputLabelProps) {
    super('div', props);
  }

  compile(): string {
    const tmpl = readFileSync(
      './src/components/input-block/input-label/tmpl.hbs',
      'utf8',
    );
    const input = Handlebars.compile(tmpl);

    return input(this.props);
  }
}
