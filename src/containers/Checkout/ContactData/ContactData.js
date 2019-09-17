import React, {Component} from 'react';
import Buttom from '../../../components/UI/Button/Button';
import Classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {
  state =  {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHaddler = (event) => {
    event.preventDefault();

    this.setState({loading: true})
    console.log('orderHaddler', this.props)
    let order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'Squaq',
				address: {
					number: 5,
					street: '123 st',
					zipCode:'123456789'
				}
			}

		}
		console.log('purchaseContinueHandler', this.state.loading)
		axios.post('/orders.json', order).then(s => {
			console.log('success ==> ', s);
      this.setState({loading: false});
      this.props.history.push('/');
		}).catch( e=> {
			console.log('error ==> ', e)
			this.setState({loading: false});
		})


  }

  render () {

    let form = (this.state.loading) ? <Spinner/> : 
      <form>
        <Input inputtype="input" text="text" name="name" placeholder="Your Name"/>
        <Input inputtype="input" ttext="email" name="email" placeholder="Your Mail"/>
        <Input inputtype="input" ttext="text" name="street" placeholder="Street"/>
        <Input inputtype="input" ttext="text" name="postal" placeholder="Postal Code"/>
        <Buttom btnType="Success" clicked={this.orderHaddler}>ORDER</Buttom>
      </form>
    return (
      <div className={Classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;