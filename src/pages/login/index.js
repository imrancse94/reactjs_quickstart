import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
//import ReeValidate from "ree-validate";
import AuthService from "../../services";
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import PropTypes from 'prop-types';
import { formvalidation } from "../../helpers/utils";
import "../../styles/login.css";

class Index extends Component {

    constructor(props) {
        super(props);
        // this.validator = new ReeValidate({
        //     email: 'required|email',
        //     password: 'required|min:6'
        // });

        this.state = {
            credentials: {
                email: '',
                password: '',
                active: false
            },
            responseError: {
                isError: false,
                code: '',
                text: ''
            },
            isLoading: false,
            errors: {}//this.validator.errors
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleShow() {
        this.props.dispatch(actions.setLoader())
        console.log('sss', this.props);
    }

    handleHide() {
        this.props.dispatch(actions.disableLoader())
        console.log('sss', this.props);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        //const { errors } = this.validator;
        const { credentials } = this.state;
        credentials[name] = value;
        //formvalidation(credentials);

        // this.validator.validate(name, value)
        //     .then(() => {
        //         this.setState({errors, credentials})
        //     });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { credentials } = this.state;
        console.log(credentials);
        this.submit(credentials);
    }

    submit(credentials) {
        this.props.dispatch(AuthService.login(credentials))
            .catch(({ error, statusCode }) => {
                const responseError = {
                    isError: true,
                    code: statusCode,
                    text: error
                };
                this.setState({ responseError });
                this.setState({
                    isLoading: false
                });
            })

    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { isAuthenticated } = this.props;
        console.log('sss', isAuthenticated);
        if (isAuthenticated) {
            return (
                <Redirect to={from} />
            )
        }
        return (
            <div className="container login-form">
                <div className="card card-login mx-auto text-center bg-dark vertical-center">
                    <div className="card-header mx-auto bg-dark">
                        <span> 
                            {/* <img src="https://amar.vote/assets/img/amarVotebd.png" className="w-75" alt="Logo"/>  */}
                        </span><br />
                            <span className="logo_title mt-5"> Login Dashboard </span>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit} method="post">
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                                </div>
                                <input onChange={this.handleChange} type="text" name="email" className="form-control" placeholder="Username" />
                            </div>

                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                                </div>
                                <input onChange={this.handleChange} type="password" name="password" className="form-control" placeholder="Password" />
                            </div>

                            <div className="form-group">
                                <input type="submit" name="btn" value="Login" className="btn btn-outline-danger float-right login_btn" />
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.Auth.isAuthenticated,
    }
};

Index.propTypes = {
    dispatch: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(Index)

