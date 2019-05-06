








import React from 'react';
import PageTitle from 'component/page-title/index.js';
import CategorySelector from './category-selector';
import MUtil from 'util/mm.js'; 
import Product from 'service/product-service';

const _mm=new MUtil();
const _product=new Product();


class ProductDetail extends React.Component{
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
                this.setState(res);
            },(errMsg)=>{
                _mm.errorTips(errMsg);
            })
        }
    }
    


    render(){
        return (

            <div id="page-wrapper">
                <PageTitle title="Edite Product"/>
                <div className="form-horizontal">
                <div className="form-group">
                    <label className="col-md-2 control-label">Product Name</label>
                    <div className="col-md-5">
                        <p className="form-control-static">{this.state.name}</p>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-2 control-label">Product Description</label>
                    <div className="col-md-5">
                        <p className="form-control-static">{this.state.subtitle}</p>   
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-2 control-label">Categroy</label>
                    <CategorySelector
                    readOnly 
                    categoryId={this.state.categoryId}
                    parentCategoryId={this.state.parentCategoryId}
                   />
                </div>

                <div className="form-group">
                    <label className="col-md-2 control-label">Product Price</label>
                    <div className="col-md-3">
                        <div className="input-group">
                            <input 
                            type="text" className="form-control" 
                            readOnly 
                            value={this.state.price}
                           />
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
                             readOnly 
                             value={this.state.stock}
                             />  
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
                    :(<div>No image</div>)}
                    </div>
                    
                    
                    <div className="col-md-10">
                    
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




export default ProductDetail;
