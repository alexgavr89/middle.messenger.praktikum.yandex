import Block from '../../modules/block';

import './style.scss';

export default class App<A, E> extends Block {
    constructor(props: { app: A; stylesWrap?: string[]; events?: E}) {
        super('div', props);
    }

    compile(): string {
        return '';
    }

    mounted(): void {
        return;
    }

    update(): void {
        this.element.appendChild(this.props.app.getContent());
    }
}
