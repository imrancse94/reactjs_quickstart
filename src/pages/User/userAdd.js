import React, { Component } from 'react';
//import ReeValidate from 'ree-validate';
import AuthService from "../../services";
import { connect } from 'react-redux';
import Http from '../../Http'
import * as API_ENDPOINT from '../../apiendpoint';
class UserAdd extends Component {


    constructor(props) {
        super(props);
        this._isMounted = false;
        // ReeValidate.extend('confirmation', (value, [otherValue]) => {
        //     return value === otherValue;
        // }, {
        //     hasTarget: true,
        // });
        // this.validator = new ReeValidate({
        //     username: 'required',
        //     language: 'required',
        //     email: 'required|email',
        //     password: 'required|min:8',
        //     password_confirmation: 'required|confirmation:password',
        //     usergroup_id: 'required|integer'
        // });


        this.state = {
            dropdownOpen: false,
            radioSelected: 2,
            inputData: {
                username: '',
                email: '',
                password: '',
                language: '',
                password_confirmation: '',
                usergroup_id: ''
            },

            responseError: '',
            usergroupList: '',
            isLoading: false,
            errors: {}//this.validator.errors
        };

        this.setstate = this.setstate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.setErrorMessage = this.setErrorMessage.bind(this);

    }

    setstate(obj) {
        if (this._isMounted) {
            this.setState(obj);
        }
    }

    componentDidMount() {
        Http.get(API_ENDPOINT.AUTH_USER_GROUP_LIST)
            .then(response => {
                this.setState({ userlist: response.data.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }





componentWillUnmount() {
    this._isMounted = false;
}

userGroupList() {
    if (this.state.userlist instanceof Array) {
        return (this.state.userlist.map(function (object, i) {
            return <option key={i} value={object.id}>{object.name}</option>;
        }))
    }


}



handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const { inputData } = this.state;
    console.log('ssss', inputData);
    for (let name of data.keys()) {
        const input = form.elements[name];
        const inputName = input.name;
        const value = input.value;
        inputData[inputName] = value;
        this.setstate({ inputData });
    }

    this.submit(inputData);
}


submit(credentials) {
    this.props.dispatch(AuthService.userAdd(credentials))
        .catch(({ error, statusCode }) => {

        })

}


handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const { errors } = this.validator;
    const { inputData } = this.state;
    inputData[name] = value;
    errors.remove(name)
    this.validator.validate(name, value)
        .then(() => {
            this.setState({ errors })
        })
}


render() {
        const {errors} = this.state;
        let username = null;
        let email = null;
        let password = null;
        let c_pass = null;
        let language = null;
        let usergroup_id = null;
        if(this.props.data){
            username = this.props.data.username;
            email = this.props.data.email;
            password = this.props.data.password;
            c_pass = this.props.data.password_confirmation;
            language = this.props.data.language;
            usergroup_id = this.props.data.usergroup_id;

        }

    return (
        <div>

            <div className="card card-warning">
                <form role="form" method={'post'} autoComplete={'off'} onSubmit={this.handleSubmit}>
                    <div className="card-header">
                        <h3 className="card-title">Add User</h3>
                    </div>
                    <div className="card-body">

                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Username</label>
                                    <input autoComplete={'off'} name={'username'} type="text" onInput={() => this.handleChange} className={username ? "form-control is-invalid" : 'form-control'} placeholder="Enter ..." />
                                    <div className="invalid-feedback">
                                        {username ? username:''}
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input name={'email'} type="email" onChange={() => this.handleChange} className={email ? "form-control is-invalid" : 'form-control'} placeholder="Enter ..." />
                                    <div className="invalid-feedback">
                                        {email ? email:''}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Password</label>
                                    <input name={'password'} type="password" onChange={() => this.handleChange} className={password ? "form-control is-invalid" : 'form-control'} placeholder="Enter ..." />
                                    <div className="invalid-feedback">
                                        {password?password:''}
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input name={'password_confirmation'} type="password" onChange={() => this.handleChange} className={c_pass ? "form-control is-invalid" : 'form-control'} placeholder="Enter ..." />
                                    <div className="invalid-feedback">
                                        {c_pass ? c_pass:''}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>User Group</label>
                                    <select name={'usergroup_id'} onChange={() => this.handleChange} className={usergroup_id ? "form-control is-invalid" : 'form-control'}>
                                        <option value={''}>Please select</option>
                                        {this.userGroupList()}
                                    </select>
                                    <div className="invalid-feedback">
                                        {usergroup_id ? usergroup_id:''}
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Language</label>
                                    <input name={'language'} onChange={() => this.handleChange} type="text" value={'en'} className={language ? "form-control is-invalid" : 'form-control'} placeholder="Enter ..." />
                                    <div className="invalid-feedback">
                                        {language ? language:''}
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="card-footer text-right">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>

        </div>
    );
}
}

const mapStateToProps = (state) => {
    return {
        data: state.Auth.data
    }
};



export default connect(mapStateToProps)(UserAdd);

