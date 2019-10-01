import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
	ingredients: null,
	totalPrice: 4,
	error: false
};

const INGREDIENT_PRICES = {
	salad: .5,
	cheese: .4,
	meat: 1.3,
	bacon: .7
}

const removeOrAddIngredient = (state, action, remove) => {
	const op = remove ? - 1 : 1;
	const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + (1 * op)};
	const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
	const updatedState = {
		ingredients: updatedIngredients,
		totalPrice: state.totalPrice + (INGREDIENT_PRICES[action.ingredientName] * op)
	};
	return updateObject(state, updatedState);
};

const setIngredients = (state, action) => {
	return updateObject (state, {
		ingredients: {
			salad: action.ingredients.salad,
			bacon: action.ingredients.bacon,
			cheese: action.ingredients.cheese,
			meat: action.ingredients.meat
		},
		totalPrice: 4,
		error: false
	});
}

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case actionTypes.ADD_INGREDIENT: return removeOrAddIngredient(state, action);
		case actionTypes.REMOVE_INGREDIENT: return removeOrAddIngredient(state, action, true);
		case actionTypes.SET_INGREDIENTS:
			return setIngredients(state, action);
		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return  updateObject (state, { error: true });
		default:
			return state;
	}
}

export default reducer;