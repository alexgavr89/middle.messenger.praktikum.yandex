import Handlebars from 'handlebars';
import { Block, Props } from '../../../modules/block';
import tmpl from './tmpl';

export interface IInputErrorProps extends Props {
	error: string;
}

export class InputError extends Block {
	constructor(props: IInputErrorProps) {
		super('div', props);
	}

	compile(): string {
		const inputError = Handlebars.compile(tmpl);

		return inputError(this.props);
	}
}
