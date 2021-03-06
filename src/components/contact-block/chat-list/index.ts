import Handlebars from 'handlebars';
import { Block, Props } from '../../../modules/block';
import ChatBlock from './chat-block';
import { IChat } from './chat-block/chat';
import tmpl from './tmpl';

import './style.scss';

interface IChatListProps extends Props {
	list: IChat[];
}

export default class ChatList extends Block {
	constructor(props: IChatListProps) {
		super('div', { ...props });
	}

	compile(): string {
		const input = Handlebars.compile(tmpl);

		return input(this.props);
	}

	update(): void {
		const list = this.element.querySelector('.chat-list');

		this.props.list.forEach((element: IChat) => {
			const chatBlock = new ChatBlock({ chatProps: element });

			list.append(chatBlock.getContent());
		});
	}
}
