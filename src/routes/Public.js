import React from 'react'
import {Route,Redirect} from 'react-router'


const PublicRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        <main className="login-main fadeIn animated">
            <Component {...props}/>
        </main>

    )}/>
);



export default PublicRoute;

