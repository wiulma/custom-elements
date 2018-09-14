import Navigo from 'navigo'
import viewService from './ViewService'
import userService from './UserService'

/**
 * Routing service
 * @description routing service manager
 */
export default {

  nav: [],

  init() {
    const r = this.router = new Navigo(null, true);

    this.router.hooks({
      after: () => this.nav.push(this.router._lastRouteResolved.url)
    });

    this.router
      .on('/', () => {
        import ('./../components/login/Login');
        import ('./../components/notification/Notification');
      })
      .on('private', () => {
        const profile = viewService.profileView[userService.profile.role];
        import(/* webpackChunkName: "private" */ `./../modules/${profile.module}/index`).then( p => {
          p.default.init();
        })
      }, {
        before: this.authGuard.bind(this)
      })
      .resolve();
  },

  get() {
    return this.router;
  },

  authGuard(done, params) {
    this.checkCurrentUser()
      .then(() => done())
      .catch(() => this.router.navigate(""));
  },

  checkCurrentUser() {
    if (!this.nav.length) {
      return Promise.reject("invalid.credential");
    } else {
      return userService.checkAuth();
    }
  }

}