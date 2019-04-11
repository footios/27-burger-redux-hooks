import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions';
import { updateObject, checkValidity } from '../../../shared/utility';

import classes from './ContactData.module.css';

//child of Checkout
class ContactData extends Component {
	email = localStorage.getItem('email');

	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'name'
				},
				value: '',
				validation: {
					required: true
				},
				touched: false,
				valid: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'street'
				},
				value: '',
				validation: {
					required: true
				},
				touched: false,
				valid: false
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'zip code'
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5
				},
				touched: false,
				valid: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'country'
				},
				value: '',
				validation: {
					required: true
				},
				touched: false,
				valid: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'e-mail'
				},
				value: this.email,
				validation: {
					required: true
				},
				touched: false,
				valid: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'fastest' },
						{ value: 'cheapest', displayValue: 'cheapest' }
					]
				},
				value: 'fastest', // we fix this later
				valid: true, // needed for formIsValid...
				validation: {} // no need validation
			}
		},
		formIsValid: false,
		loading: false
	};

	componentDidMount() {
		if (this.props.token !== null) {
			this.setState((state) => {
				state.orderForm.email.validation.required = false;
				state.orderForm.email.valid = true;
				state.orderForm.email.touched = true;
				return state;
			});
		}
	}

	orderHandler = (event) => {
		event.preventDefault();
		const formData = {};
		for (const orderFormIdentifier in this.state.orderForm) {
			if (this.state.orderForm.hasOwnProperty(orderFormIdentifier)) {
				formData[orderFormIdentifier] = this.state.orderForm[orderFormIdentifier].value;
			}
		}
		this.setState({ loading: true });
		const date = new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear()
		const minutes = () => {
			let minutes = new Date().getMinutes()
			if (minutes <= 9) {
				return "0" + minutes
			} else {
				return minutes
			}
		}
		const time = new Date().getHours() + ":" + minutes()
		
		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			orderData: formData,
			userId: this.props.userId,
			date: date + " at " + time
		};

		this.props.onOrderBurger(order, this.props.token);
	};

	inputchangeHandler = (event, inputIdentifier) => {
		const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
			value: event.target.value,
			valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
			touched: true
		});
		const updatedOrderForm = updateObject(this.state.orderForm, {
			[inputIdentifier]: updatedFormElement
		});

		let formIsValid = true;
		for (let inputIdentifier in updatedOrderForm) {
			if (updatedOrderForm.hasOwnProperty(inputIdentifier)) {
				formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
			}
		}
		this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
	};

	render() {
		const formElementsArray = [];
		for (const key in this.state.orderForm) {
			if (this.state.orderForm.hasOwnProperty(key)) {
				formElementsArray.push({
					id: key,
					config: this.state.orderForm[key]
				});
			}
		}
		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementsArray.map((formElement) => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						inValid={!formElement.config.valid}
						touched={formElement.config.touched}
						changed={(event) => this.inputchangeHandler(event, formElement.id)}
					/>
				))}
				<Button btnType="Success" disabled={!this.state.formIsValid}>
					ORDER
				</Button>
			</form>
		);
		if (this.props.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onOrderBurger: (order, token) => dispatch(actions.purchaseBurger(order, token))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
