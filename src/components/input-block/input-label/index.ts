import Handlebars from 'handlebars';
import { Block, Props } from '../../../modules/block';
import tmpl from './tmpl';

export interface IInputLabelProps extends Props {
	id: string;
	label: string;
}

export class InputLabel extends Block {
	constructor(props: IInputLabelProps) {
		super('div', props);
	}

	compile(): string {
		const input = Handlebars.compile(tmpl);

		return input(this.props);
	}
}
