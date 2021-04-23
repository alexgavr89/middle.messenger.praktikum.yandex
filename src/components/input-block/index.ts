import Block from '../../modules/block';

import './style.scss';

export default class InputBlock<L, I, Er, E> extends Block {
    constructor(props: { label: L; input: I, error: Er; stylesWrap?: string[]; events?: E; }) {
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
