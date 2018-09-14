import routingService from './service/RoutingService'
import storageService from './service/StorageService'

import './app.scss'

if (module.hot) {
  module.hot.accept()
}

routingService.init();
storageService.init();
