import {MDCPersistentDrawer, MDCPersistentDrawerFoundation, util} from '@material/drawer';

import template from './home.html'
import domUtils from '../../../../utils/Dom'
import './home.scss'

customElements.define('app-home', class extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    const n = domUtils.htmlToElement(template);
    this.appendChild(n);

    const drawerEl = this.querySelector('.mdc-drawer');
    const drawer = new MDCPersistentDrawer(drawerEl);
    this.querySelector('.home-menu').addEventListener('click', function() {
      drawer.open = !drawer.open;
    });
    drawerEl.addEventListener('MDCPersistentDrawer:open', function() {
      console.log('Received MDCPersistentDrawer:open');
    });
    drawerEl.addEventListener('MDCPersistentDrawer:close', function() {
      console.log('Received MDCPersistentDrawer:close');
    });
  }

})