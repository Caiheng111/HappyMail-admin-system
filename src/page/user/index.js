




import React from 'react';
import PageTitle from 'component/page-title/index.js';
import {Link} from 'react-router-dom';
import Pagination from 'util/pagination/index.js';
import MUtil from 'util/mm.js';
import User from 'service/user-service.js';
import TableList from 'util/table-list/index.js';
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
            this.setState(res);
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
        return (

            <div id="page-wrapper">
                <PageTitle title="User List"/>
                <TableList tableHeads={['ID','User Name','Emial','Phone number','Sign Up Time']}>
                {listBody}
                </TableList>
                <Pagination
                 curent={this.state.pageNum} 
                 total={this.state.total}
                 onChange={(pageNum)=>this.onPageNumChange(pageNum)}/>
            </div>
        )
    }
}

export default UserList;