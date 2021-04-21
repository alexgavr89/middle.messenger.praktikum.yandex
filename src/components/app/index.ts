import Block from '../../modules/block';

import './style.scss';

export default class App extends Block {
    constructor(props) {
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
