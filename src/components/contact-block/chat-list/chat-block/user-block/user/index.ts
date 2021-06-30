import Handlebars from 'handlebars';
import { Block, Props } from '../../../../../../modules/block';
import Avatar from '../../../../../avatar';
import ButtonIcon from '../../../../../button-icon';
import tmpl from './tmpl';

import './style.scss';

export interface IUser extends Props {
	id: number;
	first_name: string | null;
	second_name: string | null;
	display_name: string | null;
	login: string;
	email: string;
	phone: string | null;
	avatar: string | null;
	role: string;
}

interface IUserProps extends IUser {
	btnIconClass: string;
	avatarBlock?: Avatar;
	btnRemove?: ButtonIcon;
}

export class User extends Block {
	constructor(props: IUserProps) {
		super('div', {
			...props,

			avatarBlock: new Avatar({ src: props.avatar || '' }),

			btnRemove: new ButtonIcon({ iconClass: props.btnIconClass }),

			stylesWrap: ['user'],
		});
	}

	compile(): string {
		const user = Handlebars.compile(tmpl);

		this.props.display_name =
			this.props.display_name || `${this.props.first_name} ${this.props.second_name}`;

		return user(this.props);
	}

	update(): void {
		this.element.insertBefore(this.props.avatarBlock.getContent(), this.element.firstChild);

		this.element.append(this.props.btnRemove.getContent());
	}
}
