




import React from 'react';
import PageTitle from 'component/page-title/index.js';
import {Link} from 'react-router-dom';
import Pagination from 'util/pagination/index.js';
import MUtil from 'util/mm.js';
import User from 'service/user-service.js';
const _user=new User();
const _mm=new MUtil();


class UserList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            list: [],
            pageNum:1
        };
    }

    componentDidMount(){
        this.loadUserlList();
    }

    loadUserlList(){
        _user.getUserList(this.state.pageNum).then(res=>{
            this.setState(res)
        },errmsg=>{
            _mm.errorTips(errMsg)
        });
    }

    onPageNumChange(pageNum){
        this.setState({
            pageNum:pageNum
        },()=>{
            this.loadUserlList();
        })
    }
    render(){

        let listBody=this.state.list.map((user,index)=>{
            return(
                <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{new Date(user.createTime).toLocaleString()}</td>
                </tr>
            );
        });

        let listError=(
            <tr>
                <td colSpan="5" className="text-center">can't find relative results</td>
            </tr>
        );
        let tableBody=this.state.list.length>0 ? listBody :listError;
        return (

            <div id="page-wrapper">
                <PageTitle title="User List"/>
                <div className="col-md-12">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User Name</th>
                                <th>Emial</th>
                                <th>Phone number</th>
                                <th>Sign Up Time</th>
                            </tr> 
                        </thead>
                        <tbody>
                            {tableBody}
                        </tbody>
                    </table>
                </div>
                <Pagination
                 curent={this.state.pageNum} 
                 total={this.state.total}
                 onChange={(pageNum)=>this.onPageNumChange(pageNum)}/>
            </div>
        )
    }
}

export default UserList;