import render from '../../utils/render-dom';
import { Block } from '../block';

export interface Props {
	rootQuery: string;
}

export class Route {
	private block: Block;

	constructor(private pathname: string, private ViewClass: typeof Block, private props: Props) {
		this.block = null;
	}

	navigate(pathname: string): void {
		if (this.match(pathname)) {
			this.block.show();
		}
	}

	leave(): void {
		this.block.remove();
	}

	match(pathname: string): boolean {
		return pathname === this.pathname;
	}

	render(): void {
		if (!this.block) {
			this.block = new this.ViewClass('div', { stylesWrap: ['app'] });
		}

		render(this.props.rootQuery, this.block);
	}
}
