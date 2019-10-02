import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
		type: actionTypes.AUTH_ORDERS_START
	};
};

export const authSuccess = (authData) => {
  return {
		type: actionTypes.AUTH_ORDERS_SUCCESS,
		authData
	};
};

export const authFail = (error) => {
  return {
		type: actionTypes.AUTH_ORDERS_FAIL,
		error
	};
};

export const auth = (email, password) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email,
			password,
			returnSecureToken: true
		}
		axios.post(
			'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyCMGW9HpXAy9xRLJUYGes3tTh9WuZlbOSc',
			authData
		).then(s => {
			console.log(s);
			dispatch(authSuccess(s.data));
		})
		.catch(e => {
			console.log(e);
			dispatch(authFail(e));
		});
	}
}