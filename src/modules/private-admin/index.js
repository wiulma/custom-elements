import viewService from './../../service/ViewService'
import routingService from './../../service/RoutingService'


export default {

  init() {
    this.initContent();
    this.initRoutes();
  },

  initContent() {
    document.body.className = "private";
    import ('./components/home/Home');
    import ('./components/dashboard/Dashboard');
    document.getElementById(viewService.ROOT_AREA).innerHTML = "<app-home></app-home>";
    routingService.router.updatePageLinks();
  },

  initRoutes() {
    routingService.router
      .on('private/dashboard', () => {
        document.getElementById(viewService.CONTENT_AREA).innerHTML = "<app-dashboard></app-dashboard>";
      }, {
        before: routingService.authGuard.bind(routingService)
      })
      .on('private/settings', () => {
        import ('./components/settings/Settings');
        document.getElementById(viewService.CONTENT_AREA).innerHTML = "<app-settings></app-settings>";
        
      }, {
        before: routingService.authGuard.bind(routingService)
      })
      .resolve()
      
  }

}
