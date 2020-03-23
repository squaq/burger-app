import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
// import BurguerBuilder from './containers/BurgerBuilder/BurguerBuilder';
// import Logout from './containers/Auth/Logout/Logout';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';

import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const Checkout = asyncComponent(() => import('./containers/Checkout/Checkout'));
const Auth = asyncComponent(() => import('./containers/Auth/Auth'));
const Orders = asyncComponent(() => import('./containers/Orders/Orders'));
const Logout = asyncComponent(() => import('./containers/Auth/Logout/Logout'));
const BurgerBuilder = asyncComponent(() => import('./containers/BurgerBuilder/BurguerBuilder'));

class App extends Component {

  componentDidMount() {
    this.props.onTryAuthSignup();
  }

  
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/"/>
      </Switch>  
    );

    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/auth" component={Auth}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to="/"/>
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAuthSignup: () => dispatch(actions.authCheckState)
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
