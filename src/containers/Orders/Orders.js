import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class Orders extends Component {
	state = {
		orders: [],
		loading: true
	}
	componentWillMount () {
		axios.get('orders.json')
			.then(s => {
				let fetchOrders = []
				for (let key in s.data) {
					console.log(key, s.data[key])
					fetchOrders.push({
						...s.data[key],
						id: key
					})
				}
				this.setState({loading: false, orders: fetchOrders})
			})
			.catch( e => {
				console.log(e.data)
				this.setState({loading: false})
			})
	}

	render () {
		let orders = this.state.orders ? 
									this.state.orders.map((i) => (<Order ingredients={i.ingredients} price={i.price} key={i.id}/>)) 
									: null;
		return (
			<div>
				{ orders }
			</div>
		);
	}
}

export default withErrorHandler(Orders, axios);