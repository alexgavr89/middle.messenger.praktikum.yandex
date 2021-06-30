import { Block, Props } from '../../modules/block';

import '../style.scss';

export default class ServerError extends Block {
	constructor(props: Props) {
		super('div', props);
	}

	update(): void {
		this.element.append('500');
	}
}
