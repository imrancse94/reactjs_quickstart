import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import AuthService from "../../services";
import "../../styles/header.css";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  constructor(props) {
    super(props);
    this._isMounted = false;
    this.setstate = this.setstate.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.hideMobile = this.hideMobile.bind(this);
    this.state = {visible:false}

}

componentDidMount(){
  this._isMounted = true;

}

componentWillUnmount(){
   this._isMounted = false;
}


setstate(obj){
  if(this._isMounted){
    this.setState(obj);
  }
}

handleLogout() {
   // event.preventDefault();
    //this.props.dispatch(actions.authLogout());
    this.props.dispatch(AuthService.logout());

}

handleOutsideClick(e) {

  if (this.node && this.node.contains(e.target)) {
    return;
  }

  this.toggleNavbar();
}

toggleNavbar(e) {
  if (!this.state.visible) {
    document.addEventListener('click', this.handleOutsideClick, false);
  } else {
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

  this.setstate({ visible: !this.state.visible });
}

hideMobile() {
  document.body.classList.toggle('sidebar-collapse');

}
  render() {

    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
          <nav className="main-header navbar navbar-expand navbar-white navbar-light">

              <ul className="navbar-nav">
                  <li className="nav-item">
                      <Link to={'#'} onClick={this.hideMobile} className="nav-link" data-widget="pushmenu" href="#">
                        <i className="fas fa-bars"></i>
                        </Link>
                  </li>

              </ul>



              <ul className="navbar-nav ml-auto navbar-right-top">
                  <li className="nav-item dropdown nav-user">
                    <Link to={'#'}  onClick={this.toggleNavbar} className="nav-link nav-user-img" href="#" id="navbarDropdownMenuLink2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                      <img src="/storage/img/avatars/1.jpg" alt="" className="user-avatar-md rounded-circle nav-user-img-profile"/>
                      </Link>
                      <div ref={node => { this.node = node; }} className={this.state.visible ? "dropdown-menu dropdown-menu-right nav-user-dropdown show":"dropdown-menu dropdown-menu-right nav-user-dropdown"} aria-labelledby="navbarDropdownMenuLink2">
                        <Link to={'#'} className="dropdown-item" href="#"><i className="fas fa-user mr-2"></i>Account</Link>
                        <Link to={'#'} className="dropdown-item" href="#"><i className="fas fa-cog mr-2"></i>Setting</Link>
                        <Link to={'#'} onClick={this.handleLogout} className="dropdown-item" href="#"><i className="fas fa-power-off mr-2"></i>Logout</Link>
                        </div>
                      </li>
              </ul>
          </nav>

      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default connect()(DefaultHeader);
