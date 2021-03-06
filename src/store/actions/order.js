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

export const purchaseBurger = (orderData, token) => {
	return dispatch => {
		dispatch(purchaseBurgerStart());
		axios.post(`orders.json?auth=${token}`, orderData).then(s => {
			dispatch(purchaseBurgerSuccess(s.data.name, orderData));
		}).catch( e => {
			dispatch(purchaseBurgerFail(e));
		})
	};
};

export const purchaseInit = () => {
	return { type: actionTypes.PURCHASE_INIT };
};

export const fetchOrdersSuccess = orders => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders
	};
};

export const fetchOrdersFail = error => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		error
	};
};

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START
	};
};

export const fetchOrders = (token, userId) => {
	return dispatch => {
		dispatch(fetchOrdersStart());
		const queryParams = `?auth=${token}&orderBy="userId"&equalTo=${userId}`;
		axios.get(`orders.json${queryParams}`)
			.then(s => {
				let fetchOrders = []
				for (let key in s.data) {
					// console.log(key, s.data[key])
					fetchOrders.push({
						...s.data[key],
						id: key
					})
				}
				dispatch(fetchOrdersSuccess(fetchOrders));
			})
			.catch( e => {
				dispatch(fetchOrdersFail(e));
			})
		
	};
};
