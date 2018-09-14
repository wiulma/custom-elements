import apiService from './ApiStubService';

/**
 * User Service
 * @description Client service in order to call user related APIs
 */
export default {

  profile: {},

  checkAuth() {
    try {
      /*
      return fetch(`${API_URL}/api/auth`, {
        headers: {
          'Authorization': `Bearer ${this.profile.token}`
        }
      })
      .then((response) => response.ok)
      .catch(() => false);
      */
     return apiService.auth(this.profile.token);
    } catch (exc) {
      return Promise.resolve(false);
    }
  }
  
}