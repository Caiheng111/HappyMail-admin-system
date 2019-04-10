

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom';
import Home from 'page/home/index.js';
import Layout from './component/layout';
import Login from 'page/login/index.js';
import ErrorPage from 'page/error/index.js';
import UserList from 'page/user/index.js';
import OrderList from 'page/order/index.js';
import OrderDetail from 'page/order/detail.js';
import ProductRouter from 'page/product/router.js';


class App extends React.Component{
    render(){
        let LayoutRouter=(
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/product" component={ProductRouter}/>
                    <Route path="/product-category" component={ProductRouter}/>
                    <Route path="/user/index" component={UserList}/>
                    <Route path="/order/index" component={OrderList}/>
                    <Route path="/order/detail/:orderNumber" component={OrderDetail}/>
                    <Redirect exact from="/user" to="/user/index"/>
                    <Redirect exact from="/order" to="/order/index"/>
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
