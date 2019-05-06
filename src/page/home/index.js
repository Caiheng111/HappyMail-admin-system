


import React from 'react';
import './index.scss';
import PageTitle from 'component/page-title/index.js';
import {Link} from 'react-router-dom';
import MUtil from 'util/mm.js';
import Statistic from 'service/statistic-service.js';

const _statistic=new Statistic();
const _mm=new MUtil(); 

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userCount:'-',
            productCount:'-',
            orderCount:'-'
        }
    }
    componentDidMount(){
        this.loadCount();
    }

    loadCount(){
        _statistic.getHomeCount().then(res=>{
            this.setState(res);
        },err=>{
            _mm.errorTips(errMsg);
        })
    }

    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title="Home">
                </PageTitle>
                <div className="row">
                    <div className="col-md-4">
                        <Link to="/user" className="color-box brown">
                            <p className="count">{this.state.userCount}</p>
                            <p className="desc">
                                <i className="fa fa-user"></i> &nbsp;
                                <span>Total User</span>
                            </p>
                        </Link>
                    </div>

                    <div className="col-md-4">
                        <Link to="/product" className="color-box green">
                            <p className="count">{this.state.productCount}</p>
                            <p className="desc">
                                <i className="fa fa-list"></i> &nbsp;
                                <span>Total Products</span>
                            </p>
                        </Link>
                    </div>

                    <div className="col-md-4">
                        <Link to="/order" className="color-box blue">
                            <p className="count">{this.state.orderCount}</p>
                            <p className="desc">
                                <i className="fa fa-check-square"></i> &nbsp;
                                <span>Total Orders</span>
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;