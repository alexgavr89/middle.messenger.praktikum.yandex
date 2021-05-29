import {readFileSync} from 'fs';
import Handlebars from 'handlebars';
import Block from '../../../modules/block';

import './stype.scss';

export default class Input<E> extends Block {
    constructor(props: { id: string; type: string; placeholder: string; stylesWrap?: string[]; events?: E }) {
        super('div', props);
    }

    compile(): string {
        const tmpl = readFileSync('./src/components/input-block/input/tmpl.hbs', 'utf8');
        const input = Handlebars.compile(tmpl);

        return input(this.props);
    }

    mounted(): void {
        return;
    }

    update(): void {
        return;
    }
}
