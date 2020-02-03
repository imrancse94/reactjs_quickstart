import React from 'react';
import ReactDOM from 'react-dom';
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
import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";

const jwt_secret = "8ZHYMszCUh1WO9nl0fH3yEirRlHMir9MpIjAAYQvQXv9zpv4Enq6Oc6g7YpYZp2N";

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




