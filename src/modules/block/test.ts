import { expect } from 'chai';
import { Block, Props } from './index';

describe('Block', () => {
  function createBlock(tagName: string, props: Props) {
    return new Block(tagName, props);
  }

  it('getContent возвращает HTMLElement', () => {
    const block = createBlock('div', {});

    expect(block.getContent()).instanceOf(HTMLElement);
  });

  it('setProps изменяет свойства', () => {
    const block = createBlock('div', {});
    block.setProps({ test: 'test' });

    expect(block.props.test).to.equal('test');
  });
});
