import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import {updateObject, checkValidity} from '../../shared/utility';


class Auth extends Component {
	
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Email Address'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Password'
				},
				value: '',
				validation: {
					required: true,
					minLength: 6
				},
				valid: false,
				touched: false
			}
		},
		isSignup: true
	}
	componentDidMount() {
		if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
			this.props.onSetAuthRedirectPath();
		}
	}

	switchAuthModeHandler = (event) => {
		event.preventDefault();
		this.setState(prevState => {
			return { isSignup: !prevState.isSignup };
		});
	}

	inputChangedHandler = (event, controlName) => {


    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
				valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
				touched: true,
				elementConfig: this.state.controls[controlName].elementConfig
      })
    })

		this.setState({controls: updatedControls});
	}
	submitHandler = (event) => {
		event.preventDefault();
		this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
	}

	render () {
		let formElementsArray = []
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
		}
		
		let form = formElementsArray.map(el => {
			return (
			<Input
				key={el.id}
				elementType={el.config.elementType}
				elementConfig={el.config.elementConfig}
				value={el.config.value}
				invalid={!el.config.valid}
				shouldValidate={el.config.validation}
				touched={el.config.touched}
				changed={event => this.inputChangedHandler(event, el.id)}
			/>
		)});
		if (this.props.loading) form = <Spinner />
		
		let errorMessage = null;
		if (this.props.error) errorMessage = (<p>{this.props.error.message}</p>);

		let authRedirect = null;
		if (this.props.isAuthenticated) authRedirect = <Redirect to={this.props.authRedirectPath}/>

		return (
			<div className={classes.Auth}>
				{errorMessage}
				{authRedirect}
				<form>
				{form}
					<Button clicked={this.submitHandler} btnType="Success">SUBMIT</Button>
					<Button
						btnType="Danger"
						clicked={this.switchAuthModeHandler}
					>SWITCH TO {!this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		buildingBurger: state.burgerBuilder.building,
		authRedirectPath: state.auth.authRedirectPath
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);