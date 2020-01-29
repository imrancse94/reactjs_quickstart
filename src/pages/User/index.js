import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import AuthService from "../../services";
import Table from "../../components/Table";
import {getQueryStringValue} from '../../helpers/utils';
import { Pagination } from "../../components/Pagination";

import Http from "../../Http";
import * as action from "../../store/actions";
import * as API_ENDPOINT from "../../apiendpoint";

class Index extends Component {

    constructor(props) {

        super(props);
        this.state = {value: '', userList: '', table: '', userData: {
                data: [],
                from :'',
                per_page :'',
                last_page:'',
                current_page:'',
                next_page_url:'',
                first_page_url:'',
                last_page_url:'',
                prev_page_url:'',
                searchQuery:'',
                test_type:'',
                sortColumn:'',
                sortOrder:'',
                loading:true
            },page:1};
    }

    componentDidMount() {

        this.getCallApi()

    }

    componentWillReceiveProps(){
        console.log('ssss',this.props)
    }



    getCallApi(url = null){
        let page = 1;

        if (!url) {
            url = API_ENDPOINT.AUTH_USERLIST + "/?page=" + page
        }

        Http.get(url)
            .then(res => {
                let response = res.data.data;
                this.setState({userData:{
                    data: response.data,
                    from:response.from,
                    per_page:response.per_page,
                    last_page:response.last_page,
                    current_page:response.current_page,
                    next_page_url:response.next_page_url,
                    first_page_url:response.first_page_url,
                    last_page_url:response.last_page_url,
                    prev_page_url:response.prev_page_url,
                    path:response.path,
                    loading: false
                }});

            })
            .catch(err => {

            })

    }


    params(){
        return {
            page:2
        }
    }



    render() {
        const {userData} = this.state;
        console.log('dddd',userData)


        console.log('userData',userData)
        return (
            <React.Fragment>
                <div className="user-management">
                    <div className="row">
                        <div className="col-md-12 text-right">
                            <Link to="/user/add" className="btn btn-primary btn-sm add-user-btn">Add user</Link>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">{this.props.tableprops.tableTitle ? this.props.tableprops.tableTitle : ''}</h3>
                                    <div className="card-tools">
                                        <div className="input-group input-group-sm" style={{width: 150 + 'px'}}>
                                            <input type="text" name="table_search" className="form-control float-right"
                                                   placeholder="Search"/>

                                            <div className="input-group-append">
                                                <button type="submit" className="btn btn-default"><i
                                                    className="fas fa-search"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body table-responsive p-0">
                                    <Table userData = {userData} />
                                </div>
                                <div className="card-footer clearfix">
                                    <Pagination  getCallApi={this.getCallApi} data={userData} />
                                </div>

                            </div>


                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const tableprops = () => {
    return {
        tableTitle: "User List",
    }
}


const mapStateToProps = (state) => {
    let userlist = null;
    let current_page = 1;
    let paginate = null;
    if (state.Auth.data) {
        userlist =  state.Auth.data.data
        current_page = state.Auth.data.current_page;
        paginate = state.Auth.data;
    }
    return {
        userList: userlist,
        tableprops: {
            tableTitle: "User List",
            tableheading: [
                {col: 'ID'},
                {col: 'Username'},
                {col: 'Email'},
                {col: 'Created At'},
            ],
            current_page: current_page
        },
        pagination: {
            data: paginate
        }
    }

};

export default connect(mapStateToProps)(Index);
