import { expect } from 'chai';
import Router from './index';

describe('Router', () => {
  function createRouter(option?: string) {
    return Router.getInstance(option);
  }

  it('является объектом', () => {
    const router = createRouter();

    expect(router).to.be.an('object');
  });

  it('добавляет запись в историю браузера', () => {
    const router = createRouter();

    router.go('/login');
    router.go('/register');

    expect(window.history.length).to.equal(3);
  });
});
