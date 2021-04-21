import Handlebars from 'handlebars';
import Block from "../../modules/block";

import './style.scss';

const fs = require('fs');

export default class Link extends Block {
    constructor(props) {
        super('div', props);
    }

    compile(): string {
        const tmpl = fs.readFileSync('./src/components/link/tmpl.hbs', 'utf8');
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
