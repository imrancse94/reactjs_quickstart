import React, {Component} from 'react';
import {Nav, NavItem, NavLink, Progress, TabContent, TabPane, ListGroup, ListGroupItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {getMainEndpoint} from '../../helpers/utils';
//import classNames from 'classnames';
// import $ from 'jquery';

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

class DefaultAside extends Component {

    constructor(props) {
        super(props);
        console.log('this.props.data',this.props.data);
        
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {isSidebarOpen: 'nav-item has-treeview'};
    }


    toggleNavbar(e) {
        e.currentTarget.parentElement.classList.toggle('menu-open');
        
        
    }

    render() {
        const {isSidebarOpen} = this.state;
        const {sidebar, props, urlSubmoduleAssoc} = this.props.data;
        let counter = 0;

        return (
            <React.Fragment>
                <aside className="main-sidebar sidebar-dark-primary elevation-4">

                    <a href="index3.html" className="brand-link">
                        <img src="/storage/dist/img/AdminLTELogo.png" alt="AdminLTE Logo"
                             className="brand-image img-circle elevation-3"
                             style={{backgroundColor: 'rgba(0,0,0,0.8)'}}/>
                        <span className="brand-text font-weight-light">AdminLTE 3</span>
                    </a>


                    <div className="sidebar">

                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img src="/storage/dist/img/user2-160x160.jpg" className="img-circle elevation-2"
                                     alt="User Image"/>

                            </div>
                            <div className="info">
                                <a href="#" className="d-block">Alexander Pierce</a>
                            </div>
                        </div>

                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                                data-accordion="false">
                                {sidebar.map((item) => {

                                    return <li key={counter++}
                                               className={urlSubmoduleAssoc[getMainEndpoint(window.location.pathname)] == item.id ? 'nav-item has-treeview menu-open' : 'nav-item has-treeview'}>
                                        <Link to={'#'} ref={"toggle-div"} className="nav-link"
                                              onClick={this.toggleNavbar}>
                                            <i className="nav-icon fas fa-chart-pie"></i>
                                            <p>
                                                {item.name}
                                                <i className="right fas fa-angle-left"></i>
                                            </p>
                                        </Link>
                                        <ul key={counter++} className="nav nav-treeview slideToggle">
                                            {
                                                item.children.map((children_item) => {
                                                    return <li key={counter++} className={"nav-item"}>
                                                        <Link to={children_item.url}
                                                              className={getMainEndpoint(window.location.pathname) == children_item.url ? "nav-link active" : "nav-link"}>
                                                            <i className="far fa-circle nav-icon"></i>
                                                            <p>{children_item.name}</p>
                                                        </Link>
                                                    </li>
                                                })}

                                        </ul>
                                    </li>;
                                })}


                                {/*<li className="nav-header">EXAMPLES</li>*/}

                            </ul>
                        </nav>

                    </div>

                </aside>
            </React.Fragment>
        );
    }
}

DefaultAside.propTypes = propTypes;
DefaultAside.defaultProps = defaultProps;

export default DefaultAside;
