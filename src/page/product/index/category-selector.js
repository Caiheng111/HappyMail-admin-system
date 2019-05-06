










import React from 'react';
import './category-selector.scss';
import MUtil from 'util/mm.js'; 
import Product from 'service/product-service';

const _mm=new MUtil();
const _product=new Product();



class CategorySelector extends React.Component{
    constructor(props){
        super(props);
        this.state={
            firstCategoryList:[],
            firstCategoryId:0,
            secondCategoryList:[],
            secondCategoryId:0,
           
        }
    }

    componentDidMount(){
        this.loadFirstCategory();
    }

     componentWillReceiveProps(nextProps){
        let categoryIdChange=this.props.categoryId !==this.props.categoryId,
            parentCategoryIdChange=this.props.parentCategoryId !==this.props.parentCategoryId;
            if(!categoryIdChange&& !parentCategoryIdChange){
                return;
            }
            if(nextProps.parentCategoryId===0){
                this.setState({
                    firstCategoryId:nextProps.categoryId,
                    secondCategoryId:0
                })
            }else{
                this.setState({
                    firstCategoryId:nextProps.parentCategoryId,
                    secondCategoryId:nextProps.categoryId
                },()=>{
                    parentCategoryIdChange&& this.loadSecondCategory();
                });
            }

    }

    loadFirstCategory(){
        _product.getCategoryList().then(res=>{
            this.setState({
                firstCategoryList:res
            });
        },errMsg=>{
            _mm.errorTips(errMsg);
        });
    }

    loadSecondCategory(){
        _product.getCategoryList(this.state.firstCategoryId).then(res=>{
            this.setState({
                secondCategoryList:res
            });
        },errMsg=>{
            _mm.errorTips(errMsg);
        });
    }


    onFirstCatrgoryChange(e){
        let newValue=e.target.value || 0;
        this.setState({
            firstCategoryId:newValue,
            secondCategoryId:0,
            secondCategoryList:[]

        },()=>{
            this.loadSecondCategory();
            this.onPropsCategoryChange();
        });

    }

    secondCatrgoryChange(e){
        let newValue=e.target.value || 0;
        this.setState({
            secondCategoryId:newValue,

        },()=>{
            this.onPropsCategoryChange();
        });
    }

    onPropsCategoryChange(){
        let categoryChangeable=typeof this.props.onCategoryChange==='function';
        if(this.state.secondCategoryId){
            categoryChangeable && this.props.onCategoryChange(this.state.secondCategoryId,this.state.firstCategoryId);
        }else{
            categoryChangeable && this.props.onCategoryChange(this.state.firstCategoryId,0);
        }
    }


    render(){
        
        return (

        <div className="col-md-10">
            <select 
            value={this.state.firstCategoryId}
            className="form-control cate-select"
            onChange={(e)=>this.onFirstCatrgoryChange(e)}>
                <option value="">Please choose first level classification</option>
                {
                    this.state.firstCategoryList.map(
                        (category,index)=>
                        <option value={category.id} key={index}>{category.name}</option>
                    )
                }
            </select>

            {this.state.secondCategoryList.length?
            (<select 
            value={this.state.secondCategoryId}
            className="form-control cate-select"
            onChange={(e)=>this.secondCatrgoryChange(e)}>
                <option value="">Please choose second level classification</option>
                {
                    this.state.secondCategoryList.map(
                        (category,index)=>
                        <option value={category.id} key={index}>{category.name}</option>
                    )
                }
            </select>) :null
            }
        </div> 
        )
    }
}


export default CategorySelector;
