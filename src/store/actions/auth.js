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
			console.log('success', res);
			dispatch(authSuccess(res.data));
		})
		.catch(err => {
			dispatch(authFail(err));
		});
		// if(isSignup) url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyCMGW9HpXAy9xRLJUYGes3tTh9WuZlbOSc';

		// axios.post(
		// 	url,
		// 	// 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCMGW9HpXAy9xRLJUYGes3tTh9WuZlbOSc',
		// 	authData
		// ).then(s => {
		// 	console.log(s);
		// 	dispatch(authSuccess(s.data.idToken, s.data.localId));
		// 	dispatch(checkAuthTimeout(s.data.expiresIn));
		// })
		// .catch(e => {
		// 	console.log(e);
		// 	dispatch(authFail(e.response.data.error));
		// });
	}
}