const { JSDOM } = require('jsdom');

// const jsdom = new JSDOM('<!doctype html><html><body></body></html>');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'https://example.org/',
  referrer: 'https://example.com/',
  contentType: 'text/html',
  includeNodeLocations: true,
  storageQuota: 10000000,
});

const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};

global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};

global.cancelAnimationFrame = (id) => {
  clearTimeout(id);
};
copyProps(window, global);
