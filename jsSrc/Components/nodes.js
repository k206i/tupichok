/**
 * DOM-элементы, с которыми работают разные модули из любой точки приложения.
 * @type {{body: HTMLElement, appBody: Element}}
 */

export const MAIN_NODES = {
  body: window.document.body,
  appBody: window.document.getElementById('root'),
};