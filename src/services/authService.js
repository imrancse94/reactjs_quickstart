import Http from '../Http'
import * as action from '../store/actions'
import * as API_ENDPOINT from '../apiendpoint';
import {toastr} from 'react-redux-toastr';

export function login(credentials) {

    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post(API_ENDPOINT.AUTH_LOGIN_URL,credentials)
                .then(res => {
                    const reponse = res.data;
                    if(reponse.success){
                        dispatch(action.authLogin(reponse));
                        toastr.success('Login', 'Successfully login');
                        return resolve();
                    }

                    const statusCode = reponse.errorcode;
                    const data = {
                        error: reponse.message,
                        statusCode,
                    };
                    return reject(data);

                }).catch(err => {
                    console.log('err',err);
                    const statusCode = err.response.status;
                    const data = {
                        error: null,
                        statusCode,
                    };
                    if (statusCode === 401 || statusCode === 422) {
                        // status 401 means unauthorized
                        // status 422 means unprocessable entity
                        data.error = err.response.data.message;
                    }
                    return reject(data);
                })
        })
    )
}

export function getUserGroupList() {

    return dispatch => (
        new Promise((resolve, reject) => {
            Http.get(API_ENDPOINT.AUTH_USER_GROUP_LIST)
                .then(res => {
                    dispatch(action.getUserGroupList(res.data));
                    return resolve();
                })
                .catch(err => {
                    return reject(err);
                })
        })
    )
}


export function logout() {

    return dispatch => (
        new Promise((resolve, reject) => {

            Http.post(API_ENDPOINT.AUTH_LOGOUT_URL,{})
                .then(res => {
                    dispatch(action.authLogout());
                    return resolve();
                })
                .catch(err => {


                    const statusCode = err.response.status;
                    const data = {
                        error: null,
                        statusCode,
                    };
                    if (statusCode === 401 || statusCode === 422) {
                        // status 401 means unauthorized
                        // status 422 means unprocessable entity
                        data.error = err.response.data.message;
                    }
                    return reject(data);
                })
        })
    )
}
//code change
export function userGroupList() {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.get(API_ENDPOINT.USER_GROUP_LIST)
                .then(res => {
                    dispatch(action.getUserGroupList(res.data));
                    return resolve(res.data);
                })
                .catch(err => {


                     return reject(err);
                })
        })
    )
}

export function userAdd(inputData) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post(API_ENDPOINT.AUTH_USERADD,inputData)
                .then(res => {
                    dispatch(action.authuserAdd(res.data));
                    if(res.data.success){
                        toastr.success('New User', 'Successfully added');
                    }
                    return resolve(res.data);
                })
                .catch(err => {
                    const statusCode = err.response.status;
                    const data = {
                        error: null,
                        statusCode,
                    };
                    if (statusCode === 401 || statusCode === 422) {
                        // status 401 means unauthorized
                        // status 422 means unprocessable entity
                        data.error = err.response.data.message;
                    }
                    return reject(data);
                })
        })
    )
}

export function userList(page) {
    let url = API_ENDPOINT.AUTH_USERLIST;
    if(page){
      url = API_ENDPOINT.AUTH_USERLIST+"/?page="+page
    }
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.get(url)
                .then(res => {
                    dispatch(action.authuserList(res.data));
                    return resolve(res.data);
                })
                .catch(err => {


                })
        })
    )
}


export function socialLogin(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post(`../api/auth/login/${data.social}/callback${data.params}`)
                .then(res => {
                    dispatch(action.authLogin(res.data));
                    return resolve();
                })
                .catch(err => {
                    const statusCode = err.response.status;
                    const data = {
                        error: null,
                        statusCode,
                    };
                    if (statusCode === 401 || statusCode === 422) {
                        // status 401 means unauthorized
                        // status 422 means unprocessable entity
                        data.error = err.response.data.message;
                    }
                    return reject(data);
                })
        })
    )
}

export function resetPassword(credentials) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post('../api/password/email', credentials)
                .then(res => {
                    return resolve(res.data);
                })
                .catch(err => {
                    const statusCode = err.response.status;
                    const data = {
                        error: null,
                        statusCode,
                    };
                    if (statusCode === 401 || statusCode === 422) {
                        // status 401 means unauthorized
                        // status 422 means unprocessable entity
                        data.error = err.response.data.message;
                    }
                    return reject(data);
                })
        })
    )
}

export function updatePassword(credentials) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post('../../api/password/reset', credentials)
                .then(res => {
                    const statusCode = res.data.status;
                    if (statusCode == 202) {
                        const data = {
                            error: res.data.message,
                            statusCode,
                        }
                        return reject(data)
                    }
                    return resolve(res);
                })
                .catch(err => {
                    const statusCode = err.response.status;
                    const data = {
                        error: null,
                        statusCode,
                    };
                    if (statusCode === 401 || statusCode === 422) {
                        // status 401 means unauthorized
                        // status 422 means unprocessable entity
                        data.error = err.response.data.message;
                    }
                    return reject(data);
                })
        })
    )
}

export function register(credentials) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post('api/auth/register', credentials)
                .then(res => {
                    return resolve(res.data);
                })
                .catch(err => {
                    const statusCode = err.response.status;
                    const data = {
                        error: null,
                        statusCode,
                    };
                    if (statusCode === 422) {
                        Object.values(err.response.data.message).map((value,i) => {
                            data.error = value
                        });

                    }else if (statusCode === 400) {
                        data.error = err.response.data.message;
                    }
                    return reject(data);
                })
        })
    )
}
