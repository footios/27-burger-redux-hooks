import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

// import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
//import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
// import Logout from './containers/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions';
import Spinner from './components/UI/Spinner/Spinner';

const Checkout = React.lazy(() => {
	return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
	return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
	return import('./containers/Auth/Auth');
});

const Logout = React.lazy(() => {
	return import('./containers/Logout/Logout');
});

const app = (props) => {
	useEffect(() => {
		props.onTryAutoSignup();
	}, []);

	let routes = (
		<Switch>
			<Route path="/auth" exact render={() => <Auth/>} />
			<Route path="/" exact component={BurgerBuilder} />
			{/* <Redirect to='/'/>  this is now reduntant because of  isAuthInitialized */}
		</Switch>
	);
	if (props.isAuthenticated) {
		routes = (
			<Switch>
				{/* With just 'exact' the order doesn't matter, but with Switch it does! */}
				{/* The 'exact' in the Route with path='/checkout' was preventing the ContactData to render */}
				<Route path="/checkout" render={() => <Checkout {...props} />} />
				<Route path="/orders" exact render={() => <Orders />} />
				<Route path="/auth" exact render={() => <Auth />} />
				<Route path="/logout" exact render={() => <Logout />} />
				<Route path="/" exact component={BurgerBuilder} />
			</Switch>
		);
	}
	return (
		<div>
			{props.isAuthInitialized ? (
				<Layout>
					<Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
				</Layout>
			) : (
				<Spinner />
			)}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
		isAuthInitialized: state.auth.authInitialized
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
