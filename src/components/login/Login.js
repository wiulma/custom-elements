import {MDCTextField} from '@material/textfield';
import {MDCRipple} from '@material/ripple';

import './login.scss';

import domUtils from '../../utils/Dom';
import template from './login.html';
import loginService from '../../service/LoginService';
import routingService from '../../service/RoutingService';
import notificationService from '../notification/NotificationService';

customElements.define('app-login', class extends HTMLElement {

  constructor() {
    super();
    this.listeners = {
      'btnLogin': this.doLogin.bind(this),
      'btnCancel': this.doCancel.bind(this)
    };    
  }

  connectedCallback() {
    const n = domUtils.htmlToElement(template);
    this.username = new MDCTextField(n.querySelector('.username'));
    this.password = new MDCTextField(n.querySelector('.password'));

    const btnLogin = n.querySelector('.login')
    const btnCancel = n.querySelector('.cancel')

    new MDCRipple(btnLogin);
    new MDCRipple(btnCancel);

    btnLogin.addEventListener("click", this.listeners['btnLogin']);
    btnCancel.addEventListener("click", this.listeners['btnCancel']);

    this.appendChild(n);
  }

  disconnectedCallback() {
    const btnLogin = this.querySelector('.login')
    const btnCancel = this.querySelector('.cancel')
    btnLogin.removeEventListener("click", this.listeners['btnLogin']);
    btnCancel.removeEventListener("click", this.listeners['btnCancel']);
  }

  doLogin (evt) {
    evt.preventDefault();
    loginService.doLogin(new FormData(this.querySelector('#loginForm')))
      .then( (data) => {
        routingService.get().navigate("private");
      })
      .catch((err) => {
        notificationService.show("Login failed", notificationService.STYLE.ERROR);
      });
  }

  doCancel (evt) {
    evt.preventDefault();
    this.querySelector('#loginForm').reset();
  }

});