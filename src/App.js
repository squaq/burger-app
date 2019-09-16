import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import BurguerBuilder from './containers/BurgerBuilder/BurguerBuilder'
import Orders from './containers/Orders/Orders'
import Checkout from './containers/Checkout/Checkout';
import {Route, Switch} from 'react-router-dom';

// import Checkout

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/orders" component={Orders}/>
            <Route path="/" exact component={BurguerBuilder}/>
            <Route/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
