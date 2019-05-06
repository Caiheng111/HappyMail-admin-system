




import React from 'react';
import PageTitle from 'component/page-title/index.js';
import TableList from 'util/table-list/index.js';
import {Link} from 'react-router-dom';
import Pagination from 'util/pagination/index.js';
import ListSearch from './index-list-search.js';

import MUtil from 'util/mm.js'; 
import Product from 'service/product-service';
import './index.scss';


const _mm=new MUtil();
const _product=new Product();


class ProductList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            list: [],
            pageNum:1,
            listType:'list'
        };
    }

    componentDidMount(){
        this.loadProdcutList();
    }

    loadProdcutList(){
        let listParam={};
        listParam.listType=this.state.listType;
        listParam.pageNum=this.state.pageNum;

        if(this.state.listType==='search'){
            listParam.searchType=this.state.searchType;
            listParam.keyword=this.state.searchKeyword;
        }

        _product.getProductList(listParam).then(res=>{
            this.setState(res);
        },errMsg=>{
            this.setState({
                list:[]
            });
            _mm.errorTips(errMsg);
        });
    }

    onSearch(searchType,searchKeyword){
        // console.log(searchKeyword,searchType);
        let listType=searchKeyword===''?'list':'search';
        this.setState({
            listType:listType,
            pageNum:1,
            searchType:searchType,
            searchKeyword:searchKeyword
        },()=>{
            this.loadProdcutList();
        });
    }

    onPageNumChange(pageNum){
        this.setState({
            pageNum:pageNum
        },()=>{
            this.loadProdcutList();
        })
    }

    //change the product status
    onSetProductStatus(e,productId,currentStatus){
        let newStatus=currentStatus==1?2:1,
            confirmTips=currentStatus==1?
            'Are yopu sure to remove this item?':'Are you sure to upload this item ?';
        if(window.confirm(confirmTips)){
            _product.setProductStatus({
                productId:productId,
                status:newStatus
            }).then(res=>{
                _mm.successTips(res);
                this.loadProdcutList();
        },errMsg=>{
            _mm.errorTips(errMsg);
        });
     }
    }
    render(){
        let tableHeads=[
            {name:'Product ID',width:'10%'},
            {name:'Information',width:'50%'},
            {name:'Price',width:'10%'},
            {name:'Status',width:'15%'},
            {name:'Operation',width:'15%'}

        ]
        
        return (

            <div id="page-wrapper">
                <PageTitle title="Product List">
                    <div className="page-header-right">
                        <Link to="/product/save" className="btn btn-primary">
                            <i className="fa fa-plus"></i> &nbsp;
                            <span>Add Item</span> 
                        </Link>
                    </div>
                </PageTitle>
                <ListSearch 
                onSearch={(searchKeyword,searchType)=>{this.onSearch(searchKeyword,searchType)}}/>
                <TableList tableHeads={tableHeads}>
                        {this.state.list.map((product,index)=>{
                     return(
                        <tr key={index}>
                            <td>{product.id}</td>
                            <td>
                                <p>{product.name}</p> 
                                <p>{product.subtitle}</p> 
                            </td>
                            <td>${product.price}</td>
                            <td>
                                <p>{product.status==1?'On sale':'Sold out'}</p> 
                                <button className="btn btn-xs btn-warning" onClick={(e)=>{this.onSetProductStatus(e,product.id,product.status)}}>{ product.status==1?'Sold out':'Updating'}</button>
                            </td>
                            <td>
                                <Link className="opear" to={`/product/detail/'${product.id}`}>Details</Link>
                                <Link className="opear" to={`/product/save/'${product.id}`}>Edite</Link>
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

export default ProductList;