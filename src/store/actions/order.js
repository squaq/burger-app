import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData
	};
};

export const purchaseBurgerFail = (error) => {
  return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error
	};
};

export const purchaseBurgerStart = (orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_START
	}
}

export const purchaseBurger = (orderData) => {
	return dispatch => {
		dispatch(purchaseBurgerStart());
		axios.post('/orders.json', orderData).then(s => {
			dispatch(purchaseBurgerSuccess(s.data.name, orderData));
      // this.props.history.push('/');
		}).catch( e => {
			console.log('purchaseBurgerStart success', e.data)
			dispatch(purchaseBurgerFail(e));
		})
	};
};

export const purchaseInit = () => {
	return { type: actionTypes.PURCHASE_INIT };
}