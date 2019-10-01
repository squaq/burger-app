import * as actionTypes from './actionTypes';

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
	}
}