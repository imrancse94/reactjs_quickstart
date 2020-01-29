import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
  Form,
  FormGroup,
  FormFeedback,
  FormText,
  Label,
  Input
} from 'reactstrap';

import ReeValidate from 'ree-validate'
import { Header,Segment,Dimmer,Loader,Message} from 'semantic-ui-react';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import Widget03 from '../../views/Widgets/Widget03'

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')
import AuthService from '../../services'
import {toastr} from 'react-redux-toastr'


class UserAdd extends Component {

  constructor(props) {
    super(props);
    this._isMounted = false;
    ReeValidate.extend('confirmation', (value, [otherValue]) => {
        return value === otherValue;
      }, {
        hasTarget: true,
    });
    this.validator = new ReeValidate({
            name:'required',
            language:'required',
            email: 'required|email',
            password: 'required|min:8',
            password_confirmation: 'required|min:8',
            usergroup_id:'required'
        });


    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      inputData: {
                name:'',
                email: '',
                password: '',
                language:'',
                password_confirmation:'',
                usergroup_id:''
            },
        responseError:'',
        usergroupList:'',
        isLoading: false,
        errors: this.validator.errors
    };
        this.setstate = this.setstate.bind(this);
        this.toggle = this.toggle.bind(this);
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getUserGroupList = this.getUserGroupList.bind(this);
        this.setErrorMessage = this.setErrorMessage.bind(this);

  }

  setstate(obj){
    if(this._isMounted){
      this.setState(obj);
    }
  }

  componentDidMount(){
     this._isMounted = true;
     //this.getUserGroupList();
  }

  componentWillUnmount(){
      this._isMounted = false;
  }

  toggle() {
    this.setstate({
      dropdownOpen: !this.state.dropdownOpen,
    })

  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        const { errors } = this.validator;
        const {inputData} = this.state;
        inputData[name] = value;

        this.validator.validate(name, value)
            .then(() => {
                this.setstate({errors, inputData});
            });
    }

    handleSubmit(event) {
      event.preventDefault();

      const form = event.target;
      const data = new FormData(form);
      const {inputData} = this.state;

      for (let name of data.keys()) {
        const input = form.elements[name];
        const inputName = input.name;
        const value = input.value;
        inputData[inputName] = value;
        this.setstate({inputData});
      }

      this.validator.validateAll(inputData)
          .then(success => {
              if (success) {
                  this.setState({
                      isLoading: true
                  });
                  this.submit(inputData);
              }else{
                const errors = this.validator.errors;
                this.setstate({errors});
              }
          });
    }

    submit(inputData) {

         this.props.dispatch(AuthService.userAdd(inputData))
            .then(({success, errorcode,data,message}) =>{
                this.setstate({
                  isLoading: false
                });

              var responseError = '';
               if(success){
                 toastr.success('Success!!', message);
                 this.props.history.push('/user');
               }else{
                 responseError = data;
                }

                this.setstate({responseError});

            }).catch(({error, statusCode}) => {
                const responseError = {
                    isError: true,
                    code: statusCode,
                    text: error
                };

                this.setstate({responseError});
                this.setstate({
                    isLoading: false
                });
            });

    }

    getUserGroupList() {

      let usergroupList = [];

      this.props.dispatch(AuthService.userAddView())
         .then(({success, data}) =>{
              if(success){
               usergroupList = data.map((usergroup) => {
                  return <option  key={usergroup.id} value={usergroup.id}>{usergroup.name}</option>;
              });
              this.setstate({usergroupList});
              }

         })
         .catch(({error, statusCode}) => {

             const responseError = {
                 isError: true,
                 code: statusCode,
                 text: error
             };

             this.setstate({responseError});
             this.setstate({
                 isLoading: false
             });

         })
       }


  setErrorMessage(){
    const {errors,responseError,inputData} = this.state;
    let finalError = {
                name:'',
                email: '',
                password: '',
                language:'',
                password_confirmation:'',
                usergroup_id:''
            }


    errors.items.map(err =>{
      finalError[err.field] = err.msg;
    })

    if(responseError){
      Object.keys(responseError).map((key,value) =>{
        finalError[key] = responseError[key][0];
      });
    }

    return finalError;
  }

  render() {

    const {errors,usergroupList,responseError} = this.state;
    const finalError = this.setErrorMessage();

    return (
            <React.Fragment>
        <Dimmer active ={this.state.isLoading}>
            <Loader size='large'>Loading...</Loader>
        </Dimmer>

      <div className="animated fadeIn">
        <Row>
            <Col>
                {this.state.responseError.isError &&
                        <Message negative>
                            <Message.Content>
                                {this.state.responseError.text}
                            </Message.Content>
                        </Message>
                }
            </Col>
        </Row>
        <Row>
          <Col>
          <Card>
              <CardHeader>
                User Add
              </CardHeader>
              <CardBody>

                      <Form onSubmit={this.handleSubmit}>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input invalid={finalError.name ? true:false} onChange={this.handleChange} type="text" name="name" id="name" placeholder="Name" />
              {finalError.name &&<FormFeedback>{finalError.name}</FormFeedback>}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="modulename">Language</Label>
              <Input invalid={finalError.language ? true:false} defaultValue={{ label: "Select Dept", value: "bn" }} onChange={this.handleChange}  type="select" name="language">
                    <option value="bn">BN</option>
                    <option value="en">EN</option>
              </Input>
              {finalError.language &&<FormFeedback>{finalError.language}</FormFeedback>}
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input autoComplete="username email" invalid={finalError.email ? true:false} onChange={this.handleChange} type="email" name="email" id="email" placeholder="Email" />
              {finalError.email &&<FormFeedback>{finalError.email}</FormFeedback>}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="modulename">Usergroup</Label>
              <Input invalid={finalError.usergroup_id ? true:false} value={this.state.inputData.usergroup_id} onChange={this.handleChange}  type="select" name="usergroup_id">
                  <option key={0} value={0}>{'Select Usergroup'}</option>
                {usergroupList}
              </Input>
              {finalError.usergroup_id &&<FormFeedback>{finalError.usergroup_id}</FormFeedback>}
            </FormGroup>
          </Col>
        </Row>
        <Row form>
        <Col md={6}>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input autoComplete="new-password" invalid={finalError.password ? true:false} onChange={this.handleChange} type="password" name="password" id="password" placeholder="Password" />
              {finalError.password &&<FormFeedback>{finalError.password}</FormFeedback>}
            </FormGroup>
          </Col>
            <Col md={6}>
                <FormGroup>
                  <Label for="password_confirmation">Confirm Password</Label>
                  <Input autoComplete="new-password" invalid={finalError.password_confirmation ? true:false} onChange={this.handleChange} type="password" name="password_confirmation" id="password_confirmation" placeholder="Password" />
                  {finalError.password_confirmation &&<FormFeedback>{finalError.password_confirmation}</FormFeedback>}
                </FormGroup>
            </Col>
        </Row>
        <Row form>
            <Col md={6}>
            <Button type="submit" color="success" className="text-right">Save</Button>{' '}
            <Link to="/user" className="btn btn-primary" color="primary" >Back</Link>
            </Col>
            <Col md={6}>

            </Col>
        </Row>

      </Form>

              </CardBody>
            </Card>

          </Col>
        </Row>
      </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state) => {
    return {
        isAuthenticated : state.Auth.isAuthenticated

    }
};

export default connect(mapStateToProps)(UserAdd)
