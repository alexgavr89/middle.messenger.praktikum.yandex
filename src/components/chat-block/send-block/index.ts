import Handlebars from 'handlebars';
import { Block, Props } from '../../../modules/block';
import ButtonIcon from '../../button-icon';
import WebSocketController from '../../../controllers/WebSocketController';
import tmpl from './tmpl';

import './style.scss';

interface ISendBlockProps extends Props {
  textareaValue?: string;
  btnAdd?: ButtonIcon;
  btnSmile?: ButtonIcon;
  btnSend?: ButtonIcon;
}

export default class SendBlock extends Block {
  constructor(props?: ISendBlockProps) {
    super('div', {
      ...props,

      btnAdd: new ButtonIcon({
        iconClass: 'fas fa-paperclip',
        stylesWrap: ['button-icon'],
      }),

      btnSmile: new ButtonIcon({
        iconClass: 'far fa-smile',
        stylesWrap: ['button-icon'],
      }),

      btnSend: new ButtonIcon({
        iconClass: 'fas fa-paper-plane',
        stylesWrap: ['button-icon'],
        events: {
          click: () => {
            WebSocketController.send(this.props.textareaValue);

            this.setProps({});
            this.props.textareaValue = null;
          },
        },
      }),

      events: {
        change: (event) => {
          this.props.textareaValue = event.target.value;
        },
      },

      stylesWrap: ['send-block'],
    });
  }

  compile(): string {
    const sendBlock = Handlebars.compile(tmpl);

    return sendBlock(this.props);
  }

  update(): void {
    const tools = this.element.querySelector('.send-block__tools');
    tools.append(this.props.btnAdd.getContent());
    tools.append(this.props.btnSmile.getContent());
    tools.append(this.props.btnSend.getContent());
  }
}
