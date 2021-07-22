import Handlebars from 'handlebars';
import { Block } from '../../modules/block';
import { InputLabel, InputLabelProps } from './input-label';
import { Input, InputProps } from './input';
import { InputError, InputErrorProps } from './input-error';

import tmpl from './tmpl';
import './style.scss';

interface InputBlockProps {
  block: {
    label: InputLabelProps;
    input: InputProps;
    error: InputErrorProps;
  }
}

export default class InputBlock extends Block {
  constructor(props: InputBlockProps) {
    super('div', {
      attributes: {
        class: ['input-block'],
      },
      components: {
        label: new InputLabel(props.block.label),
        input: new Input({
          attributes: props.block.input.attributes,
          events: {
            focus: () => {
              if (this.props.components?.label instanceof InputLabel) {
                const { label } = this.props.components;
                label.visibility('visible');
              }
            },
            blur: (event) => {
              if (event.target === null || !(event.target instanceof HTMLInputElement)) {
                throw new Error(`${event} error`);
              }

              if (this.props.components?.label instanceof InputLabel) {
                const { label } = this.props.components;

                if (event.target.value.length === 0) {
                  label.visibility('hidden');
                }
              }
            },
          },
        }),
        error: new InputError(props.block.error),
      },
    });
  }

  mounted(): void {}

  render(): string {
    const inputBlock = Handlebars.compile(tmpl);

    return inputBlock({});
  }
}
