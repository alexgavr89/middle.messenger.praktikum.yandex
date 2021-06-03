import { Block, Props } from '../../modules/block';

import '../style.scss';

export default class NotFound extends Block {
	constructor(props: Props) {
		super('div', props);
	}

	update(): void {
		this.element.append('404');
	}
}
