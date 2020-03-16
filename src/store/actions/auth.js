import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
		type: actionTypes.AUTH_ORDERS_START
	};
};

export const authSuccess = (token, userId) => {
  return {
		type: actionTypes.AUTH_ORDERS_SUCCESS,
		idToken: token, 
		userId
	};
};

export const authFail = (error) => {
  return {
		type: actionTypes.AUTH_ORDERS_FAIL,
		error
	};
};

export const logout = () => {
	return { type: actionTypes.AUTH_LOGOUT };
}

export const checkAuthTimeout = expirationTime => {
	console.log('checkAuthTimeout', expirationTime)
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const auth = (email, password, isSignup) => {
	return dispatch => {
		dispatch(authStart());
		const apiKey = 'AIzaSyCMGW9HpXAy9xRLJUYGes3tTh9WuZlbOSc';

		let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
		if(!isSignup) url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

		const authData = {
			email,
			password,
			returnSecureToken: true
		}

		axios.post(url, authData)
		.then( res => {
      const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
      console.log('success', res);
      localStorage.setItem('token', res.data.idToken);
      localStorage.setItem('expirationDate', expirationDate);
			dispatch(authSuccess(res.data.idToken, res.data.localId));
			dispatch(checkAuthTimeout(res.data.expiresIn));
		})
		.catch(err => { dispatch(authFail(err.response.data.error)); });
	}
}

export const setAuthRedirectPath = path => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path
	}
}