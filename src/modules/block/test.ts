import { expect } from 'chai';
import ServerError from '../../pages/500';

describe('Block', () => {
  function createBlock() {
    return new ServerError();
  }

  it('getContent возвращает HTMLElement', () => {
    const block = createBlock();

    expect(block.getContent()).instanceOf(HTMLElement);
  });

  it('setProps изменяет свойства', () => {
    const block = createBlock();
    block.setProps({
      block: {
        text: 'Error 501',
      },
    });

    expect(block.props.block?.text).to.equal('Error 501');
  });
});
