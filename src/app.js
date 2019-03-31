

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom';
import Home from 'page/home/index.js';
import Layout from './component/layout';
import Login from 'page/login/index.js';
import ErrorPage from 'page/error/index.js';
import UserList from 'page/user/index.js';

class App extends React.Component{
    render(){
        let LayoutRouter=(
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/product" component={Home}/>
                    <Route path="/product-category" component={Home}/>
                    <Route path="/user/index" component={UserList}/>
                    <Redirect exact from="/user" to="/user/index"/>
                    <Route component={ErrorPage}/>
                </Switch>
            </Layout>
        );
        return (
          <Router>
              <Switch>
                  <Route path="/login" component={Login}/>
                  <Route path="/" render={props=>(
                    LayoutRouter
                  )}/>
              </Switch>
          </Router>
            
        )
    }
}
ReactDOM.render(
    <App/>,
    document.getElementById('app')
);
