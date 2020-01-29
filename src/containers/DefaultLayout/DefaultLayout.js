import React, {Component} from 'react';
import {connect} from 'react-redux'
import DefaultHeader from "./DefaultHeader";
import DefaultAside from "./DefaultAside";
import {getMainEndpoint} from '../../helpers/utils';

class DefaultLayout extends Component {

    signOut(e) {
        e.preventDefault()
        this.props.history.push('/login')
    }

    render() {
        let permissionscookie = localStorage.getItem('permission');
        permissionscookie = JSON.parse(permissionscookie);
        let sideBarList = permissionscookie.sideBarList;
        let data = [];

        data['props'] = this.props;

        let new_sidebar = [];
        let urlSubmoduleAssoc = [];
        let urlSubmoduleTitleAssoc = [];
        for (var current_sidebar in sideBarList) {
            var test = [];
            new_sidebar[current_sidebar] = sideBarList[current_sidebar];

            for (var x in sideBarList[current_sidebar].children) {
                urlSubmoduleAssoc[sideBarList[current_sidebar].children[x].url] = current_sidebar
                urlSubmoduleTitleAssoc[sideBarList[current_sidebar].children[x].url] = sideBarList[current_sidebar].children[x].name
            }
        }
        data['sidebar'] = new_sidebar;
        data['urlSubmoduleAssoc'] = urlSubmoduleAssoc;
        return (
            <div className="wrapper">


                <DefaultHeader/>

                <DefaultAside data={data}/>

                <div className="content-wrapper">
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0 text-dark">{urlSubmoduleTitleAssoc[getMainEndpoint(window.location.pathname)]}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="content">
                        <div className="container-fluid">
                            {this.props.children}
                        </div>
                    </section>

                </div>

                <footer className="main-footer">
                    <strong>Copyright &copy; 2014-2019 <a href="http://adminlte.io">AdminLTE.io</a>.</strong>
                    All rights reserved.
                    <div className="float-right d-none d-sm-inline-block">
                        <b>Version</b> 3.0.0
                    </div>
                </footer>


                <aside className="control-sidebar control-sidebar-dark">

                </aside>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.Auth.isAuthenticated,
        permission: state.Auth.permissions

    }
};

export default connect(mapStateToProps)(DefaultLayout);

