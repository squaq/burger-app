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
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
	state = {
		purchasing: false
	}

	updatePurchaseState = () => {
		return this.props.price > 4;
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
		this.props.onInitPurchase();
		this.props.history.push('/checkout');
	}

	componentDidMount() {
		this.props.onInitIngredients()
	}

	render () {
		let orderSummary = null
		let burger = this.props.error? <p>Ingredients can't be loaded!</p>: <Spinner/>
		if(this.props.ings) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings}/>
					<BuildControls 
						desabled={this.props.ings} 
						ingredientAdded={this.props.onIngredientAdded} 
						ingredientRemoved={this.props.onIngredientRemoved} 
						price={this.props.price}
						purchasable={this.updatePurchaseState()}
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
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error
	}
};
const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: ingredientName => dispatch(actions.addIngredient(ingredientName)),
		onIngredientRemoved: ingredientName => dispatch(actions.removeIngredient(ingredientName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));