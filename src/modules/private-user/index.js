import viewService from './../../service/ViewService'

export default {

  init() {
    this.initContent();
  },

  initContent() {
    document.body.className = "private";
    document.getElementById(viewService.ROOT_AREA).innerHTML = "<app-home><h1>user home page</h1></app-home>";
  }
}
