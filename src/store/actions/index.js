import * as ActionTypes from '../action-types'

export function authLogin(payload){
    return {
        type: ActionTypes.AUTH_LOGIN,
        payload
    }
}

export function setLogin(payload){
    return {
        type: ActionTypes.SET_LOGIN,
        payload
    }
}

export function setLoader(){
    return {
        type: ActionTypes.SET_LOADER,


    }
}

export function disableLoader(){
    return {
        type: ActionTypes.DISABLE_LOADER,

    }
}



export function authLogout(){
    return {
        type: ActionTypes.AUTH_LOGOUT
    }
}

export function authCheck(){
    return {
        type:ActionTypes.AUTH_CHECK
    }
}
//userAdd
export function authuserAdd(payload){
    return {
        type:ActionTypes.AUTH_USER_ADD,
        payload
    }
}

export function authuserList(payload){
    return {
        type:ActionTypes.AUTH_USER_LIST,
        payload
    }
}

export function getUserGroupList(payload){
    return {
        type:ActionTypes.USER_GROUP_LIST,
        payload
    }
}
