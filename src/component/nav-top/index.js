


import React from 'react';
import {Link} from 'react-router-dom';
import MUtil from 'util/mm.js';
import User from 'service/user-service.js';

const _user=new User();

const _mm=new MUtil();

class NavTop extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:_mm.getStorage('userInfo').username || ''
        }
    }

    onLogOut(){
        _user.logout().then(res=>{
            _mm.removeStorage('userInfo');
            window.location.href='/login';
        },errMsg =>{
            _mm.errTips(errmsg);
        });
    }
    render(){
        return (
            <div className="navbar navbar-default top-navbar">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/"><b>HAPPYM</b> &nbsp;MAIL</Link>
                </div>

                <ul className="nav navbar-top-links navbar-right">

                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" href="javascript:;">
                            <i className="fa fa-user fa-fw"></i>
                            <span>Welcome {this.state.username}</span>
                            <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li>
                                <a onClick={()=>{this.onLogOut()}}>
                                    <i className="fa fa-sign-out fa-fw"></i> 
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
        </div>
          
        )
    }
}

export default NavTop;