import {applyMiddleware,createStore,compose} from 'redux'
import logger from 'redux-logger'
import RootReducer from './reducers'
import ReduxThunk from 'redux-thunk'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: hardSet,
}

const persistedReducer = persistReducer(persistConfig, RootReducer);
const middleware = [ReduxThunk];

const store = createStore(
    RootReducer,
    compose(
        applyMiddleware(...middleware)

    )
);

export default store;
