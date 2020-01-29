import * as ActionTypes from '../action-types'
import Http from '../../Http'
import localforage from 'localforage';
import cookie from "js-cookie";

const user = {
    id: null,
    name: null,
    email: null,
    createdAt: null,
    updatedAt: null
};

const initialState = {
    isAuthenticated : false,
    isLoading: true,
    user
};

const Auth = (state= initialState,{type,payload = null}) => {
    switch(type){
        case ActionTypes.SET_LOGIN:
            return setLogin(state,payload);
        case ActionTypes.AUTH_LOGIN:
            return authLogin(state,payload);
        case ActionTypes.AUTH_LOGOUT:
            return logout(state);
        case ActionTypes.AUTH_USER_ADD:
            return authuserAdd(state,payload);
        case ActionTypes.SET_LOADER:
            return setLoader(state);
        case ActionTypes.DISABLE_LOADER:
            return disableLoader(state);
        case ActionTypes.AUTH_USER_LIST:
            return getuserList(payload);
        case ActionTypes.USER_GROUP_LIST:
            return getUserGroupList(payload);    
        default:
            return state;
    }


};

// ssadmin user add
const authuserAdd = (state,payload) => {

    const flashMessage = payload.description;
    const status = payload.success;

    state = Object.assign({}, state, {
        flash: flashMessage,
        status:status
    });
    return reducerResponse(payload);
    //return state;
}


const authLogin = (state,payload) => {

    const jwtToken = payload.data.access_token;
    const user = payload.data.user;
    const permissions = payload.data.permission;
    setToken(jwtToken)
    console.log('authlogin',permissions);
    localforage.setItem('permission',permissions)
    localStorage.setItem('permission',JSON.stringify(permissions))
    Http.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;

    state = Object.assign({}, state, {
        isAuthenticated: true,
        isLoading:false,
        user:user,
        permissions:permissions
    });
    return state;

};

const  setLoader = (state) => {
    state = Object.assign({},state,{isAuthenticated:true,isLoading:true
    });
    return state;
}

const  disableLoader = (state) => {
    return Object.assign({},state,{isAuthenticated:true,isLoading:false});
}
const setLogin = (state,payload) => {
    const user = payload.data.user;
    state = Object.assign({}, state, {isAuthenticated:true,isLoading:false,user:user});
    return state;
};

const setLocalForageToken = token => {
      if (!token) {
          cookie.remove("token");
      }
    cookie.set("token", token);
};

const setHttpToken = (token) => {
  if (!token) {
    Http.defaults.headers.common['Authorization'] = null;
  }

  Http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};

export const setToken = token => {
  setLocalForageToken(token);
  setHttpToken(token);
};



const logout = (state) => {

    cookie.remove('token');
    localStorage.removeItem('permission')
    state = Object.assign({},state,{
        isAuthenticated: false,
        isAdmin : false,
        user:{}
    });
    Http.defaults.headers.common['Authorization'] = "";
    return state;
};

const getuserList = (payload) => {
    return reducerResponse(payload);
}

const reducerResponse = (payload) =>{
   let object = Object.assign({}, payload, {isAuthenticated:payload.isAuthenticated,data:payload.data});
   return object;

}


const getUserGroupList = (payload) =>{
    let object = Object.assign({}, payload, {isAuthenticated:payload.isAuthenticated,userlist:payload.data});
    return object;
    
}


export default Auth;
