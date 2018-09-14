
import domUtils from '../../../../utils/Dom'
import notificationService from "./../../../../components/notification/NotificationService"
import template from './dashboard.html'
import './dashboard.scss'
import service from './DashboardService'

customElements.define('app-dashboard', class extends HTMLElement {

  constructor() {
    super();
    this.listeners = {
      btnEventNotify: this.eventNotify.bind(this),
      btnPublishNotify: this.publishNotify.bind(this),
      inputChange: this.inputChange.bind(this)
    }
  }

  connectedCallback() {
    const n = domUtils.htmlToElement(template);    
    n.querySelector('#btnEventNotify').addEventListener('click', this.listeners.btnEventNotify);
    n.querySelector('#btnPublishNotify').addEventListener('click', this.listeners.btnPublishNotify);
    this.appendChild(n);
    service.init(this);

    service.subscribe("refresh", (data) => {
      notificationService.show(`Service publish refresh with data: ${data.data}`);
    });

    this.initProxy();
  }

  disconnectedCallback() {
    this.querySelector('#btnEventNotify').removeEventListener('click', this.listeners.btnEventNotify);
    this.querySelector('#btnPublishNotify').removeEventListener('click', this.listeners.btnPublishNotify);
    this.querySelector('#proxyField').removeEventListener('input', this.listeners.inputChange);
    service.destroy();   
  }

  eventNotify () {
    let detail = this.querySelector('#dataEventNotify').value;
    const evt = new CustomEvent("showHomeEventNotify", {detail});
    this.dispatchEvent(evt)
  }

  publishNotify () {
    service.refresh({data: this.querySelector('#dataPublishNotify').value});
  }

  initProxy() {
    const f = this.querySelector('#proxyField');
    const lbl = this.querySelector('#proxyValue');
    this.data = {
      value: f.value
    };
    f.addEventListener("input", this.listeners.inputChange);

    this.dataProxy = new Proxy(this.data, {
      set: (target, prop, value) => {
        target[prop] = value;
        lbl.textContent = value;
        return true;
      }
    });
  }

  inputChange(evt) {
    this.dataProxy.value = evt.target.value;
  }
});