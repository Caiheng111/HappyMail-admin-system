





import MUtil from 'util/mm.js';
const _mm=new MUtil();

class User{
    login(loginInfo){ 
        return _mm.request({
            type:'post',
            url:'/manage/user/login.do',
            data:loginInfo  
        })
    }

    checkLoginInfo(loginInfo){
        let username= $.trim(loginInfo.username),
            password= $.trim(loginInfo.password)
        if(typeof username!=='string' || username.length===0){
            return {
                status:false,
                msg:'Please enter an username!'
            }
        }
        if(typeof password!=='string' || password.length===0){
            return {
                status:false,
                msg:'Please enter the password!'
            }
        }
        return{
            status:true,
            msg:'successfully'
        }
    }

    logout(){
        return _mm.request({
            type:'post',
            url:' /user/logout.do',
        });
    }

    getUserList(pageNum){
        return _mm.request({
            type:'post',
            url:'/manage/user/list.do',
            data:{
                pageNum:pageNum
            }
        });
    }
    
}

export default User;


