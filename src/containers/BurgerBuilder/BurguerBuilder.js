import React, {Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
	state = {
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false
	}

	updatePurchaseState = (price) => {
		this.setState({purchasable: ((price) > 4)})
	}

	purchaseHandler = () => {
		console.log('purchaseHandler')
		this.setState({purchasing: true})
	}

	purchaseCancelHandler = () => {
		console.log('purchaseCancelHandler')
		this.setState({purchasing: false})
	}

	purchaseContinueHandler = () => {
		const queryParams = [];
		for(let i in this.props.ings) {
			queryParams.push(`${encodeURI(i)}=${encodeURI(this.props.ings[i])}`);
		}
		queryParams.push(`price=${this.props.price}`)
		const queryString = queryParams.join('&');
		this.props.history.push({pathname: '/checkout', search: '?' + queryString});
	}
	componentDidMount() {
		// axios.get('ingredients.json').then(s => {
		// 	this.setState({ingredients: s.data})
		// }).catch(e => {
		// 	this.setState({error: true})
		// })
	}

	render () {
		let orderSummary = null
		let burger = this.state.error? <p>Ingredients can't be loaded!</p>: <Spinner/>
		if(this.props.ings) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings}/>
					<BuildControls 
						desabled={this.props.ings} 
						ingredientAdded={this.props.onIngredientAdded} 
						ingredientRemoved={this.props.onIngredientRemoved} 
						price={this.props.price}
						purchasable={this.state.purchasable}
						ordered={this.purchaseHandler}
					/>
				</Aux>
			);

			orderSummary = <OrderSummary
												price={this.props.price}
												ingredients={this.props.ings} 
												purchaseCancelled={this.purchaseCancelHandler} 
												purchaseContinued={this.purchaseContinueHandler}
											/>
		}

		if(this.state.loading) {
			orderSummary = <Spinner/>
		}
		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.ingredients,
		price: state.totalPrice
	}
};
const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: ingredientName => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName}),
		onIngredientRemoved: ingredientName => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName})
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));