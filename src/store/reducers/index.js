import {combineReducers} from 'redux'
import Auth from './Auth'
import persistStore from './persistStore'
import {reducer as toastr} from 'react-redux-toastr';

const reducers = {
    Auth:Auth,
    persistStore:persistStore,
    toastr: toastr
  }
const RootReducer = combineReducers(reducers);

export default RootReducer;