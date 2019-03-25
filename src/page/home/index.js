


import React from 'react';
import './index.css';
import PageTitle from 'component/page-title/index.js';

class Home extends React.Component{
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title="Dashboard">
                    <button className="btn btn-warning">dfdfd</button>
                </PageTitle>
                <div classname="row">
                    <div classname="col-md-12">
                body
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;