


import React from 'react';
import PageTitle from 'component/page-title/index.js';
import {Link} from 'react-router-dom';




class ErrorPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title="Something is wrong!"/>
                <div className="col-md-12">
                    <span>Can't find this page</span> &nbsp;
                    <Link to="/">Click here to jump to HOME page</Link>
                </div>
            </div>
        )
    }
}

export default ErrorPage;