import React, { Component } from 'react'
import { getQueryStringValue } from "../helpers/utils";
import {Link,Redirect} from 'react-router-dom';
import * as API_ENDPOINT from "../apiendpoint";
export class Pagination extends Component {

    pagination(target,e,i=null){
        e.preventDefault();
        this.setState({
            loading: true
        });

        let url;
        switch(target){
            case 'pre':
                if(this.props.data.prev_page_url != null){
                    url = API_ENDPOINT.AUTH_USERLIST+'?page='+(this.state.userData.current_page-1);
                    this.props.getCallApi(url);
                }
                break;
            case 'next':

                if(this.props.data.next_page_url != null){//current_page
                    url = API_ENDPOINT.AUTH_USERLIST+'/?page='+(this.state.userData.current_page+1);
                    this.props.getCallApi(url);
                }
                break;
            case 'btn-click':
                url = API_ENDPOINT.AUTH_USERLIST+'?page='+i;

                this.props.getCallApi(url);

                break;

        }
        this.setState({
            loading: false
        });
    }

    rows(){
        let rows = [];
        for (let i = 1; i <= this.props.data.last_page; i++) {
            rows.push(<li className="page-item" key={i}><a className="page-link" href="#" onClick={(e)=>this.pagination('btn-click',e,i)}>{i}</a></li>);
        }

        return rows;
    }

    render() {


        return (
            <ul className="pagination justify-content-end">
                <li className="page-item"><a className="page-link" href="#" onClick={(e)=>this.pagination('pre',e)}>Previous</a></li>
                {this.rows()}
                <li className="page-item"><a className="page-link" href="#" onClick={(e)=>this.pagination('next',e)}>Next</a></li>
            </ul>
        )
    }
}



export default Pagination;
