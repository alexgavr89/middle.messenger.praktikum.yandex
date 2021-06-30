import Handlebars from 'handlebars';
import { Block, Props } from '../../../modules/block';
import tmpl from './tmpl';

import './stype.scss';

export interface IInputProps extends Props {
	id: string;
	name: string;
	type: string;
	placeholder: string;
}

export class Input extends Block {
	constructor(props: IInputProps) {
		super('div', props);
	}

	compile(): string {
		const input = Handlebars.compile(tmpl);

		return input(this.props);
	}
}
