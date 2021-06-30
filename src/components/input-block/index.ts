import { Block, Props } from '../../modules/block';
import { InputLabel, IInputLabelProps } from './input-label';
import { Input, IInputProps } from './input';
import { InputError, IInputErrorProps } from './input-error';

import './style.scss';

interface InputBlockProps extends Props {
  label: IInputLabelProps;
  input: IInputProps;
  error: IInputErrorProps;
}

export default class InputBlock extends Block {
  constructor(props: InputBlockProps) {
    super('div', {
      label: new InputLabel(props.label),
      input: new Input(props.input),
      error: new InputError(props.error),
      stylesWrap: ['input-block'],
    });
  }

  mounted(): void {
    this.props.label.hide();
    this.props.error.hide();
  }

  update(): void {
    const { label, input, error } = this.props;

    this.element.append(label.getContent());
    this.element.append(input.getContent());
    this.element.append(error.getContent());
  }
}
