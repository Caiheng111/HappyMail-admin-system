




import React from 'react';
import './index.scss';
import MUtil from 'util/mm.js';
import User from 'service/user-service.js';

const _user=new User();

const _mm=new MUtil(); 

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            redirect:_mm.getUrlParam('redirect') ||'/'
        }
    }

    componentWillMount(){
        document.tttle='login in Mmall ADMIN'; 
    }

    onInputChange(e){
        const inputName=e.target.name;
        const inputValue=e.target.value;
        this.setState({
            [inputName]:inputValue,
          
        })
    }
    onInputKeyUp(e){
        if(e.keyCode===13){
            this.onSubmit();
        }
    }
    onSubmit(){
        let loginInfo={
            username:this.state.username,
            password:this.state.password,
        },
        checkResult=_user.checkLoginInfo(loginInfo);
        if(checkResult.status){
            _user.login(loginInfo).then((res)=>{
            _mm.setStorage('userInfo',res);
            this.props.history.push(this.state.redirect);
        },(errMsg)=>{
            _mm.errorTips();
        });
        }else{
            _mm.errorTips(checkResult.msg);
        }
        
    } 

  
    render(){
        return (
                <div className="col-md-4 col-md-offset-4">
                    <div className="panel panel-default login-pannel">
                        <div className="panel-heading">Welcome Loin Happy Mmall</div>
                        <div className="panel-body">
                            <div>
                                <div className="form-group">
                                    <input type="text" 
                                    name="username"
                                    className="form-control" 
                                    id="exampleInputEmail1" 
                                    placeholder="Username"
                                    onKeyUp={e=>this.onInputKeyUp(e)}
                                    onChange={e=>this.onInputChange(e)}/>
                                </div>
                                <div className="form-group">
                                    <input 
                                    type="password"
                                     name="password"
                                    className="form-control" 
                                    id="exampleInputEmail1"
                                     placeholder="password"
                                     onKeyUp={e=>this.onInputKeyUp(e)}
                                     onChange={e=>this.onInputChange(e)}/>
                                </div>
                                <button  
                                className="btn btn-lg btn-primary btn-block"
                                onClick={e=>{this.onSubmit(e)}}
                                >Login</button>
                            </div>
                        </div>
                    </div>
                </div>
    
            
        )
    }
}

export default Login;