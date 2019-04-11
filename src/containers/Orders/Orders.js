import React, { useEffect } from 'react';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';

const orders = (props) => {
	useEffect(() => {
		props.onFetchOrders(props.token, props.userId);
	}, []);

	let orders = <Spinner />;
	if (!props.loading) {
		orders = props.orders.map((orders) => {
			// Do this: price={+order.price} so the toFixed(2) will work in Order.js
			const ingredients = {
				salad: orders.ingredients.salad,
				bacon: orders.ingredients.bacon,
				cheese: orders.ingredients.cheese,
				meat: orders.ingredients.meat
			};
			return <Order key={orders.id} ingredients={ingredients} price={orders.price} date={orders.date} />;
		});
	}
	return orders;
};

const mapStateToProps = (state) => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));
