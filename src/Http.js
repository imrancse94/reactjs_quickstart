import axios from 'axios'
import store from './store'
import * as actions from './store/actions'
import Authservices from './services';
import cookie from "js-cookie";
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Authorization'] = `Bearer ${cookie.get('token')}`;
axios.interceptors.response.use(
    response => {
        console.log('re',response)
      if(response.data.errorcode === 401 ){
          store.dispatch(actions.authLogout())
          store.dispatch(Authservices.logout())
      }
      return response;
    },
    (error) => {


        return Promise.reject(error);
    }
);
export default axios;
