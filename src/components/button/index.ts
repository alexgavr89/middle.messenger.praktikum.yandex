import {readFileSync} from 'fs';
import Handlebars from 'handlebars';
import Block from "../../modules/block";

import './style.scss';

export default class Button<E> extends Block {
    constructor(props: { title: string; type: string; class?: string; stylesWrap?: string[]; events?: E; }) {
        super('div', props);
    }

    compile(): string {
        const tmpl = readFileSync('./src/components/button/tmpl.hbs', 'utf8');
        const button = Handlebars.compile(tmpl);

        return button(this.props);
    }

    mounted(): void {
        return;
    }

    update(): void {
        return;
    }
}
