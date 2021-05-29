import { readFileSync } from 'fs';
// import Handlebars from 'handlebars';
import Handlebars = require('handlebars');
import { Block, Props } from '../../modules/block';
import FormLogin from '../form-login';
import Link from '../link';

import './style.scss';

interface FormBlockProps extends Props {
  title: string;
  form: FormLogin;
  link: Link;
}

export default class FormBlock extends Block {
  constructor(props: FormBlockProps) {
    super('div', { ...props, stylesWrap: ['form-block'] });
  }

  compile(): string {
    const tmpl = readFileSync('./src/components/form-block/tmpl.hbs', 'utf8');
    const formBlock = Handlebars.compile(tmpl);

    return formBlock(this.props);
  }

  update(): void {
    this.element.append(this.props.form.getContent());
    this.element.append(this.props.link.getContent());
  }
}
