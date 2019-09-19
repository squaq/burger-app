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

const INGREDIENT_PRICES = {
	salad: .5,
	cheese: .4,
	meat: 1.3,
	bacon: .7
}

class BurgerBuilder extends Component {
	state = {
		// ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false
	}

	updatePurchaseState = (price) => {
		this.setState({purchasable: ((price) > 4)})
	}

	addIngredientHandler = (type) => {
		const oldCount = this.props.ings[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.props.ings
		};
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
		this.updatePurchaseState(newPrice)
	}

	removeIngredientHandler = (type) => {
		const oldCount = this.props.ings[type];
		const updatedCount = (oldCount > 0)? oldCount - 1 : 0;
		const updatedIngredients = {
			...this.props.ings
		};
		updatedIngredients[type] = updatedCount;
		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;
		this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
		this.updatePurchaseState(newPrice)
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
		queryParams.push(`price=${this.state.totalPrice}`)
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
						price={this.state.totalPrice}
						purchasable={this.state.purchasable}
						ordered={this.purchaseHandler}
					/>
				</Aux>
			);

			orderSummary = <OrderSummary
												price={this.state.totalPrice}
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
		ings: state.ingredients
	}
};
const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: ingredientName => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName}),
		onIngredientRemoved: ingredientName => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName})
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));