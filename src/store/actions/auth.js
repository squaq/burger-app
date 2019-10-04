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

export const auth = (email, password, isSignup) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			// email,
			// password,
			token: 'AAAA3xdwKL4:APA91bGsiPYCHifpGIOXcoR2R8kJrkOSmxPtmYAsTm7dp6muha5dECyi4rntgZmEPPPjGwPPkhk_YkIV3_cuLjfYuxIfInETL5P0xwKfuSegUvw42WTgbGbKBWfqeAXCkvDedpXR4OnU',
			returnSecureToken: true
		}
		let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyCMGW9HpXAy9xRLJUYGes3tTh9WuZlbOSc';
		if(isSignup) url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyCMGW9HpXAy9xRLJUYGes3tTh9WuZlbOSc';

		axios.post(
			url,
			// 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCMGW9HpXAy9xRLJUYGes3tTh9WuZlbOSc',
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