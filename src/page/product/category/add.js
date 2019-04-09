









import React from 'react';
import PageTitle from 'component/page-title/index.js';
import MUtil from 'util/mm.js';
import Product from 'service/product-service.js';

const _product=new Product();
const _mm=new MUtil();



class CategoryAdd extends React.Component{
    constructor(props){
        super(props);
        this.state={
            categoryList: [],
            parentId:0,
            categoryName:''
            
        };
    }

 
    componentDidMount(){
        this.loadCategoryList();
    }

    loadCategoryList(){
        _product.getCategoryList().then(res=>{
            this.setState({
                categoryList:res
            });
        },errMsg=>{
            _mm.errorTips(errMsg)
        });
    }


    onSubmit(e){
        let cateforyName=this.state.categoryName.trim();
        if(cateforyName){
            _product.saveCategory({
                parentId:this.state.parentId,
                cateforyName:categoryName
            }).then((res)=>{
                _mm.successTips(res);
                this.props.history.push('/product-category/index');
            },(errMsg)=>{
                _mm.errorTips(errMsg);
            })
        }
    }

    onValueChange(e){
        let name=e.target.name,
            value=e.target.value;
            this.setState({
                [name]:value
            })
    }


    render(){

        return (

            <div id="page-wrapper">
                <PageTitle title=" Add Category"/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-md-2 control-label">Category Class</label>
                                <div className="col-md-5">
                                <select  name="parentId"
                                         className="form-control" 
                                         onChange={(e)=>this.onValueChange(e)}>
                                        <option valur="0">category</option>
                                        {this.state.categoryList.map((category,index)=>{
                                                return <option value={category.id} key={index}>{category.name}</option>
                                            }
                                            )}
                                </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-md-2 control-label">Category Name</label>
                                <div className="col-md-5">
                                    <input type="text"
                                    className="form-control"
                                    placeholder="Please input the category name"
                                    name="cateforyName"
                                    value={this.state.stock}
                                    onChange={(e)=>this.onValueChange(e)}/>  
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-10">
                                    <button type="submit" 
                                    className="btn btn-primary"
                                    onClick={(e)=>{this.onSubmit(e)}}>Submit</button>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CategoryAdd;