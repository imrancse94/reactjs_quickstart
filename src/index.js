// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './app';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DefaultLayout from "./containers/DefaultLayout";
import {Provider} from 'react-redux'
import store from './store'
import Routes from './routes'
import * as action from './store/actions'
import jwt from "jsonwebtoken";
import Http from './Http';
import ReduxToastr from 'react-redux-toastr'; //https://www.npmjs.com/package/react-redux-toastr
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import cookie from "js-cookie";
import './styles/custom.css'
import * as serviceWorker from './serviceWorker';
import './fontawesome-free/css/all.min.css';
import './css/adminlte.min.css';
import './css/OverlayScrollbars.min.css';
const jwt_secret = "q51JgMf3m4w8n2ZlDMcRYy8PwbHpDx0cJaZHUtfWpNnueKs53ykTDLXcjZFAyosW";

let token = cookie.get("token");

if (token) {
    jwt.verify(token, jwt_secret, (err, decoded) => {
        if (err) {
            cookie.remove("token");
            token = null;
        } else {
            if (decoded.iss !== "http://localhost:8000/api/auth/login") {;
                cookie.remove("token");
                token = null;
            }
        }
    });
}

const render = () => {
    if (document.getElementById('root')) {
        ReactDOM.render(<Provider store={store}>
            <div>
                <Routes/>
                <ReduxToastr
                    timeOut={4000}
                    newestOnTop={false}
                    preventDuplicates
                    position="top-right"
                    transitionIn="fadeIn"
                    transitionOut="fadeOut"
                    closeOnToastrClick/>
            </div>
        </Provider>, document.getElementById('root'));
    }

};
if (token) {
    console.log('refresh');
    Http.post("/api/auth/me").then(res => {
        store.dispatch(action.setLogin(res.data));
        render();
    });
} else {
    render();
}

serviceWorker.unregister();




