






import React from 'react';
import PageTitle from 'component/page-title/index.js';
import TableList from 'util/table-list/index.js';
import {Link} from 'react-router-dom';
import Pagination from 'util/pagination/index.js';
import ListSearch from './index-list-search.js';

import MUtil from 'util/mm.js'; 
import Order from 'service/order-service';



const _mm=new MUtil();
const _order=new Order();


class OrderList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            list: [],
            pageNum:1,
            listType:'list'
        };
    }

    componentDidMount(){
        this.loadOrderList();
    }

    loadOrderList(){
        let listParam={};
        listParam.listType=this.state.listType;
        listParam.pageNum=this.state.pageNum;

        if(this.state.listType==='search'){
            listParam.orderNo=this.state.orderNumber;
        }

        _order.getOrderList(listParam).then(res=>{
            this.setState(res);
        },errMsg=>{
            this.setState({
                list:[]
            });
            _mm.errorTips(errMsg);
        });
    }

    onSearch(orderNumber){
        // console.log(searchKeyword,searchType);
        let listType=orderNumber===''?'list':'search';
        this.setState({
            listType:listType,
            pageNum:1,
            orderNumber:orderNumber
        },()=>{
            this.loadOrderList();
        });
    }

    onPageNumChange(pageNum){
        this.setState({
            pageNum:pageNum
        },()=>{
            this.loadOrderList();
        })
    }

    render(){
        let tableHeads=['Order Number','Recipient','Order Name','Order Status','Order Amount','Order Time','Edite']
        
        return (

            <div id="page-wrapper">
                <PageTitle title="Order List"/>
                <ListSearch 
                onSearch={(orderNumber)=>{this.onSearch(orderNumber)}}/>
                <TableList tableHeads={tableHeads}>
                        {this.state.list.map((order,index)=>{
                     return(
                        <tr key={index}>
                            <td>
                                <Link to={`/order/detail/'${order.orderNo}`}>{order.orderNo}</Link>
                            </td>
                            <td>{order.orderNo}</td>
                            <td>{order.receiverName}</td>
                            <td>{order.statusDesc}</td>
                            <td>${order.payment}</td>
                            <td>{order.createTime}</td>
                            
                            <td>
                                <Link to={`/order/detail/'${order.orderNo}`}>Details</Link>
                            </td>
                        </tr>
            );
        })
}
                    </TableList>
                <Pagination
                 curent={this.state.pageNum} 
                 total={this.state.total}
                 onChange={(pageNum)=>this.onPageNumChange(pageNum)}/>
            </div>
        )
    }
}

export default OrderList;