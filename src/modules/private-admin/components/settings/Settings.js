import domUtils from '../../../../utils/Dom'

import template from './settings.html'

customElements.define('app-settings', class extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    const n = domUtils.htmlToElement(template);
    this.appendChild(n);
  }

});