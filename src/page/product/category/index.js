







import React from 'react';
import PageTitle from 'component/page-title/index.js';
import {Link} from 'react-router-dom';
import MUtil from 'util/mm.js';
import Product from 'service/product-service.js';
import TableList from 'util/table-list/index.js';

const _product=new Product();
const _mm=new MUtil();



class CategoryList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            list: [],
            parentCategoryId:this.props.match.params.categoryId || 0
        };
    }

    componentDidMount(){
        this.loadCategoryList();
    }

    componentDidUpdate(prevProps,prevState){

        console.log('componentDidUpdate');
        console.log(this.props.match.categoryId);
        // let oldPath=prevProps.location.pathnmae,
        //     newPath=this.props.location.pathname,
        //     newId=this.props.match.params.categoryId || 0;

        //     if(oldPath!==newPath){
        //         this.setState({
        //             parentCategoryId:newId
        //         },() =>{
        //             this.loadCategoryList();
        //         });
        //     }
    }


    loadCategoryList(){
        _product.getCategoryList(this.state.parentCategoryId).then(res=>{
            this.setState({
                list:res
            });
        },errMsg=>{
            this.setState({
                list:[]
            });
            _mm.errorTips(errMsg)
        });
    }

    onUpdateName(categoryId,categoryName){
        let newName=window.prompt('Please input the new name',categoryName);
        if(newName){
            _product.updateCategoryName({
                categoryId:categoryId,
                categoryName:newName
            }).then(res=>{
                _mm.successTips(res);
                this.loadCategoryList();
            },errMsg=>{
                _mm.errorTips(errMsg);
            });
        }
    }


    render(){

        let listBody=this.state.list.map((category,index)=>{
            return(
                <tr key={index}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>
                        <a className="opear"
                        onClick={(e)=>this.onUpdateName(category.id,category.name)}>
                        Edite </a>&nbsp;  &nbsp; 
                        {
                            category.parentId===0?
                            <Link to={`/procuct-category/index/${category.id}`}>Check the Subclass Category
                            </Link>
                            :null
                        }
                      
                    </td>
                </tr>
            );
        });
        return (

            <div id="page-wrapper">
                <PageTitle title="Category List">
                     <div className="page-header-right">
                        <Link to="/product-category/add" className="btn btn-primary">
                            <i className="fa fa-plus"></i> &nbsp;
                            <span>Add Category</span> 
                        </Link>
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        <p>First Category:{this.state.parentCategoryId}</p>
                    </div>
                </div>
                <TableList tableHeads={['ID','Category Name','Edite']}>
                {listBody}
                </TableList>
            </div>
        )
    }
}

export default CategoryList;