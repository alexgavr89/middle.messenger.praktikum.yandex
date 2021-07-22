import Handlebars from 'handlebars';
import { Block } from '../../modules/block';
import FormLogin from '../form-login';
import FormRegistration from '../form-registration';
import Link from '../link';

import tmpl from './tmpl';
import './style.scss';

interface FormBlockProps {
  block: {
    title: string;
  },
  components: {
    form: FormLogin | FormRegistration;
    link: Link;
  }
}

export default class FormBlock extends Block {
  constructor(props: FormBlockProps) {
    super('div', {
      ...props,
      attributes: {
        class: ['form-block', 'form-block__header'],
      },
    });
  }

  mounted(): void {}

  render(): string {
    const formBlock = Handlebars.compile(tmpl);

    return formBlock(this.props.block);
  }
}
