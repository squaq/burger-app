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
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {
	state = {
		purchasing: false,
		loading: false,
		error: false
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
		this.props.history.push('/checkout');
	}
	componentDidMount() {
		axios.get('ingredients.json').then(s => {
			this.setState({ingredients: s.data})
		}).catch(e => {
			this.setState({error: true})
		})
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
		onIngredientAdded: ingredientName => dispatch(burgerBuilderActions.addIngredient(ingredientName)),
		onIngredientRemoved: ingredientName => dispatch(burgerBuilderActions.removeIngredient(ingredientName))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));