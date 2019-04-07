





import MUtil from 'util/mm.js';
const _mm=new MUtil();

class Product{

    getProductList(listParam){
        let url='',
        data={};
        if(listParam.listType==='list'){
            url='/manage/product/list.do';
            data.pageNum=listParam.pageNum;
        }else if(listParam.listType==='search'){
            url='/manage/product/search.do';
            data.pageNum=listParam.pageNum;  
            data[listParam.searchType]=listParam.keyword;
        }

        return _mm.request({
            type:'post',
            url:url,
            data:data
        });
    }


    getProduct(productId){
        return _mm.request({
            type:'post',
            url:'/manage/product/detail.do',
            data:{
                productId:productId || 0
            }
        });
    }


    setProductStatus(productInfo){
        return _mm.request({
            type:'post',
            url:'/manage/product/set_sale_status.do',
            data:productInfo
        });
    }


    getCategoryList(parentCategoryId){
        return _mm.request({
            type:'post',
            url:'/manage/category/get_category.do',
            data:{
                categoryId:parentCategoryId || 0
            }
        });
    }

    checkproduct(product){
        let result={
            status:true,
            msg:'successfully'
        };

        if(typeof product.name!=='string' || product.name.length===0){
            return {
                status:false,
                msg:'Please input the product name!'
            }
        }
    

        if(typeof product.subtitle!=='string' || product.subtitle.length===0){
            return {
                status:false,
                msg:'Please input the product description!'
            }
        }

        if(typeof product.categoryId!=='number' || !(product.categoryId > 0)){
            return {
                status:false,
                msg:'Please select product category!'
            }
        }

        if(typeof product.price!=='number' || !(product.price>=0)){
            return {
                status:false,
                msg:'Please input the product price!'
            }
        }

        if(typeof product.stock!=='number' || !(product.stock>=0)){
            return {
                status:false,
                msg:'Please input the product stock!'
            }
        }
        return result;
    }    


    saveProduct(product){
        return _mm.request({
            type:'post',
            url:'/manage/product/save.do',
            data:product
        });
    }
        
}

export default Product;


