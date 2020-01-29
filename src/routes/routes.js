import Login from './../pages/login'
import Register from './../views/Pages/Register'
import NoMatch from './../views/Pages/Page404'
import Dashboard from './../pages/Home';
import UserList from './../pages/User';
import UserAdd from './../pages/User/userAdd';
const routes = [
    {
        path: '/',
        exact: true,
        auth: true,
        component: Dashboard
    },
    {
        path: '/user/add/',
        exact: true,
        auth: true,
        component: UserAdd
    },

    {
        path: '/user',
        exact: true,
        auth: true,
        component: UserList
    },
    {
        path: '/user/:page?',
        exact: true,
        auth: true,
        component: UserList
    },
    {
        path: '/role',
        exact: true,
        auth: true,
        component: UserList
    },
    {
        path: '/home',
        exact: true,
        auth: true,
        component: Dashboard
    },
    {
        path: '/register',
        exact: true,
        auth: false,
        component: Register
    },
    {
        path: '/login',
        exact: true,
        auth: false,
        component: Login
    },
    {
        path: '/dashboard',
        exact: true,
        auth: true,
        component: Dashboard
    },
    {
        path: '',
        exact: false,
        auth: false,
        component: NoMatch
    }
];

export default routes;
