


class MUtil{

    request(param){
        return new Promise((resolve,reject)=>{
            $.ajax({
             type:param.type||'get',
             url:param.url|| '',
             dataType:param.dataType || 'json',
             data:param.data ||null,
             success:res=>{
                if(0===res.status){
                   typeof resolve=== 'function' && resolve (res.data, res.msg);
                }else if(10===res.status){
                    this.doLogin();
                }else{
                    typeof reject=== 'function' && reject (res.msg || res.data);
                }
             },
            error:err=>{
                typeof reject=== 'function' && reject (err.statusText);
            }
         });
        });
    } 
    doLogin(){
        window.location.href='/login?redirect ='+ encodeURIComponent(window.location.pathname);
    }
    // 获取url参数
    getUrlParam(name){
        let queryString=window.location.search.split('?')[1] || '',
         reg=new RegExp("(^|&)"+ name +"=([^&*])(&|$)"),
         result = queryString.match(reg);
         return result ? decodeURIComponent[2]:null;
    }

    successTips(successMsg){
        alert(successMsg || "Operate Successfully");
    }
    errorTips(errMsg){
        alert(errMsg || "someting is wrong");
    }

    
    setStorage(name,data){
        let dataType=typeof data;
        if(dataType==='object'){
            window.localStorage.setItem(name,JSON.stringify(data));
        } 
        else if(['number', 'string','boolean'].indexOf(dataType)){
            window.localStorage.setItem(name,data);
        }else{
            alert('this type is not supported');
        }
    }
    getStorage(name){
        let data= window.localStorage.getItem(name);
        if(data){
            return JSON.parse(data);
        }
        else{
            return '';
        }
    }

    removeStorage(name){
        window.localStorage.removeItem(name);
    }
   
}

export default MUtil;