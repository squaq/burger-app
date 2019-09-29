import React, {Component} from 'react';
import {connect} from 'react-redux';
import Buttom from '../../../components/UI/Button/Button';
import Classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';


class ContactData extends Component {
  state =  {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP CODE'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      coutry: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod:  {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true
      },

    },
    formIsValid: false
  }

  orderHaddler = (event) => {
    event.preventDefault();
    
    const formData = {};
    for(let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }
    let order = {
			ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData
    }

    this.props.onOrderBurger(order);
  }

  checkValidity(value, rules) {
    let isValid = true;

    if(!rules) {
      return true;
    }

    if(rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid
  }
  
  inputChangedHandler = (event, inputId) => {
    const updatedOrderForm = {...this.state.orderForm};
    const updatedFormEl = {...updatedOrderForm[inputId]};
    updatedFormEl.value = event.target.value;
    updatedFormEl.valid = this.checkValidity(updatedFormEl.value, updatedFormEl.validation);
    updatedFormEl.touched = true;
    updatedOrderForm[inputId] = updatedFormEl;
    let formIsValid = true;
    for(let inputIds in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIds].valid && formIsValid;
    }
    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
  }

  render () {
    let formElementsArray = []
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (this.props.loading) ? <Spinner/> : 
      <form onSubmit={this.orderHaddler}> 
        {formElementsArray.map(el => (
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
        ))}
        <Buttom btnType="Success" disabled={!this.state.formIsValid}>ORDER</Buttom>
      </form>
    return (
      <div className={Classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totaPrice,
    loading: state.loading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));