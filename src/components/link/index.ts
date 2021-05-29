import {readFileSync} from 'fs';
import Handlebars from 'handlebars';
import Block from "../../modules/block";

import './style.scss';

export default class Link<E> extends Block {
    constructor(props: { title: string; href: string;  stylesWrap?: string[]; events?: E; }) {
        super('div', props);
    }

    compile(): string {
        const tmpl = readFileSync('./src/components/link/tmpl.hbs', 'utf8');
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
