import domUtils from '../../utils/Dom';
import template from './notification.html';

customElements.define('app-notification', class extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    const n = domUtils.htmlToElement(template);
    document.body.appendChild(n);
  }
})
