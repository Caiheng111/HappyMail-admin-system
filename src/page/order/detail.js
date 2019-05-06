











import React from 'react';
import PageTitle from 'component/page-title/index.js';
import TableList from 'util/table-list/index.js';
import MUtil from 'util/mm.js'; 
import Order from 'service/order-service';

const _mm=new MUtil();
const _order=new Order();


class OrderDetail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            orderNumber:this.props.match.params.orderNumber,
            orderInfo:{}
        }

    }
    componentDidMount(){
        this.loadOrderDetail();
        
    }

    loadOrderDetail(){
            _order.getOrderDetail(this.state.orderNumber).then((res)=>{
                this.setState({
                    orderInfo:res
                });
            },(errMsg)=>{
                _mm.errorTips(errMsg);
        })
    }
    

    render(){
        let receiverInfo=this.state.orderInfo.shippingVo ||{},
            productList=this.state.orderInfo.orderItemVoList || [];
        return (
            <div id="page-wrapper">
                <PageTitle title="Order Details"/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">Order Number</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderInfo.orderNo}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">Creation Time</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderInfo.createTime}</p>   
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">Recipients</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                            {receiverInfo.receiverName}
                            {receiverInfo.receiverProvince}
                            {receiverInfo.receiverCity}
                            {receiverInfo.receiverAddress}
                            {receiverInfo.receiverMobile ||receiverInfo.receiverPhone }
                            </p>     
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">Order Status</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderInfo.statusDesc}</p>   
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">Payment Way</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderInfo.paymentTypeDesc}</p>   
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">Order Amount</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                            ${this.state.orderInfo.payment}</p>   
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">Product List</label>
                        <div className="col-md-10">
                            <TableList 
                                tableHeads={['Product Image','Product Information','Unit Price','Quantity','Total Amount']}>
                                {productList.map((product,index)=>{
                            return(
                                <tr key={index}>
                                    <td>
                                       <img 
                                        className="p-img"
                                        src={`${this.state.orderInfo.imageHost}${product.productImage}`} 
                                        alt={product.productName}/>
                                    </td>
                                    <td>{product.productName}</td>
                                    <td>${product.currentUnitPrice}</td>
                                    <td>{product.statusDesc}</td>
                                    <td>${product.quantity}</td>
                                    <td>${product.totalPrice}</td>
                                </tr>
                    );
                })
        }
                            </TableList>
                        </div>
                    </div>
               

              

              

               


                


              
                </div>
            </div>
        )
    }
}




export default OrderDetail;
