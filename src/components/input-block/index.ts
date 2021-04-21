import Block from '../../modules/block';

import './style.scss';

export default class InputBlock extends Block {
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
        const {label, input, error} = this.props;

        this.element.append(label.getContent());
        this.element.append(input.getContent());
        this.element.append(error.getContent());
    }
}
