import template from './list.html'

customElements.define('app-list', class extends HTMLElement {  

  constructor() {
    super();
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = template;
  }

  connectedCallback() {
    this.load();
  }

  load() {
    fetch('http://localhost:8005/api/user')
      .then(response => {
        return response.json();
      }).then(users => {
        const container = document.createDocumentFragment();
        container.innerHTML = users.reduce((t, u) => {
            const {name, surname} = u;
            return t + this.tmplItem;
          }, '');
          this.querySelector("list-container").appendChild(container);
      }).catch(err => {
        console.error(err.message);
      });
  }
});