import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const addIngredient = (name) => {
  return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: name
	};
};

export const removeIngredient = (name) => {
  return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: name
	};
};

export const setIngredients = ingredients => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients
	}
}

export const fetchIngredientsFailed = ingredients => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED,
		ingredients
	}
}

export const initIngredients = () => {
	return dispatch => {
		axios.get('ingredients.json').then(s => {
			// this.setState({ingredients: s.data})
			dispatch(setIngredients(s.data))
		}).catch(e => {
			// this.setState({error: true})
			dispatch(fetchIngredientsFailed())
		});
	};
}