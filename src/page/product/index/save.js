








import React from 'react';
import PageTitle from 'component/page-title/index.js';
import CategorySelector from './category-selector';

import MUtil from 'util/mm.js'; 
import Product from 'service/product-service';
import FileUploader from 'util/file-uploader/index.js';

const _mm=new MUtil();
const _product=new Product();


class ProductSave extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:this.props.match.params.pid,
            categoryId:0,
            parentCategoryId:0,
            subImages:[],
            name:'',
            subtitle:'',
            price:'',
            stock:'',
            detail:'',
            status:1

        }

    }
    componentDidMount(){
        this.loadProduct();
        
    }
   

    loadProduct(){
        if(this.state.id){
            _product.getProduct(this.state.id).then((res)=>{
                // let images=res.subImages.split(',');
                // res.subImages=images.map((imgUri)=>{
                //     return{ imgUri,
                //     url:res.imageHost+imgUri
                //     }  
                // })
                // this.setState(res);
            },(errMsg)=>{
                _mm.errorTips(errMsg);
            })
        }
    }
    

    onCategoryChange(categoryId,parentCategoryId){
        this.setState({
            categoryId:categoryId,
            parentCategoryId:parentCategoryId

        })
    }


    onUploadSuccess(res){
    let subImages=this.state.subImage;
       subImages.push(res);
       this.setState({
           subImages:subImages
       })
    }

    onUploadError(errMsg){
        _mm.errorTips(errMsg);

    }


    onValueChange(e){
        let name=e.target.name,
            value=e.target.value.trim();
        this.setState({
            [name]:value
        })
    }

    onSubmit(){
        let product={
            name:this.state.name,
            subtitle:this.state.subtitle,
            categoryId:parseInt(this.state.categoryId),
            price:parseFloat(this.state.price),
            stock:parseInt(this.state.stock),
            status:this.state.status,
        },
        productCheckResult=_product.checkproduct(product);
        if(productCheckResult.status){
            _product.saveProduct(product).then((res)=>{
                _mm.successTips(res);
            },(errMsg)=>{
                this.props.history.push('/product/index');
                _mm.errorTips(errMsg);
            });
        }else{
            _mm.errorTips(productCheckResult.msg);
        }
    }


    render(){
        return (

            <div id="page-wrapper">
                <PageTitle title={this.state.id? 'Edite Product':'Add Product'}/>
                <div className="form-horizontal">
                <div className="form-group">
                    <label className="col-md-2 control-label">Product Name</label>
                    <div className="col-md-5">
                        <input type="text"
                         className="form-control" 
                         placeholder="Please input the product name "
                         name="name"
                         value={this.state.name}
                         onChange={(e)=>this.onValueChange(e)}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-2 control-label">Product Description</label>
                    <div className="col-md-5">
                        <input type="text" className="form-control" 
                        placeholder="Please input the datails"
                        name="subtitle"
                        value={this.state.subtitle}
                        onChange={(e)=>this.onValueChange(e)}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-2 control-label">Categroy</label>
                    <CategorySelector 
                    categoryId={this.state.categoryId}
                    parentCategoryId={this.state.parentCategoryId}
                    onCategoryChange=
                    {(categoryId,parentCategoryId)=>this.onCategoryChange(categoryId,parentCategoryId)}/>
                </div>

                <div className="form-group">
                    <label className="col-md-2 control-label">Product Price</label>
                    <div className="col-md-3">
                        <div className="input-group">
                            <input 
                            type="text" className="form-control" 
                            placeholder="Price"
                            name="price"
                            value={this.state.price}
                            onChange={(e)=>this.onValueChange(e)}/>
                            <span className="input-group-addon" >AUD</span>
                        </div> 
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-md-2 control-label">Product Stock</label>
                    <div className="col-md-3">
                        <div className="input-group">
                            <input type="number"
                             className="form-control" placeholder="Stock"
                             name="stock"
                             value={this.state.stock}
                             onChange={(e)=>this.onValueChange(e)}/>  
                            <span className="input-group-addon">ITEM</span>
                        </div>   
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-md-2 control-label">Product Img</label>
                    <div className="col-md-10">
                        {this.state.subImages.length?
                        this.state.subImages.map((image,index)=>(
                        <div className="img-con" key={index} ><img src={image.url}/></div>
                        ))
                    :(<div>Please upload the image</div>)}
                    </div>
                    
                    
                    <div className="col-md-10">
                        <FileUploader 
                        onSuccess={(res)=>this.onUploadSuccess(res)}
                        onError={(errMsg)=>this.onUploadError(errMsg)}/>
                    </div>
                </div>


                <div className="form-group">
                    <label className="col-md-2 control-label">Product Details</label>
                    <div className="col-md-8">
                    <input type="text" className="form-control" placeholder="Please input the datails"/>   
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
        )
    }
}




export default ProductSave;
