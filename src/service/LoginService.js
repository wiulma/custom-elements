import serviceUtils from './../utils/Service';
import userService from './UserService';
import storageService from './StorageService';
import apiService from './ApiStubService';

/**
 * Login Service
 * * @description Client service manager, in order to call login related APIs
 */
export default {

  /**
   * Login
   * @description Call login api
   * @param {username, password} formData 
   * @return Promise return profile data or error from backend
   */
  doLogin(formData) {
    /*
    return fetch(
        `${API_URL}/api/login`,
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(serviceUtils.formDataToJson(formData))
        }
      )
      .then(response => Promise.all([response, response.json()]))
      */
     return apiService.login(serviceUtils.formDataToJson(formData))
        .then(([response, json]) => {
          if (response.ok) {
            storageService.save({key: "profile", data: json});
            return json;
          } else {
            return Promise.reject(json.message);
          }
        })
        .then(profile => {
          userService.profile = profile;
          return profile;
        });
  }

}
