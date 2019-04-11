import React, { useState, useEffect } from 'react';
import Eject from '../Eject/Eject';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

// We moved Layout to hoc because it wraps the BurgerBuilder
// in the App comp.

// Child of App
const layout = props => {

	const [showSideDrawer, setShowSideDrawer] = useState(false)
	const [drawerToggleClicked, setDrawerToggleClicked] = useState(false)
	// state = {
	// 	showSideDrawer: false,
	// 	drawerToggleClicked: false // with this the sideDrawer opens only when the button is clicked
	// };

	useEffect(() => {
		window.addEventListener('resize', () => {

			// 	/* Now the sideDrawer opens when `window.innerWidth < 500` 
			// 		and the drawerToggleClicked button is clicked.
			// 		Otherwise it opens when window.innerWidth < 500 
			// 		and keeps on opening on every componentMount,
			// 		e.g. when adding ingredients*/
			setShowSideDrawer(window.innerWidth < 500 && drawerToggleClicked)
		});
	}, [window.innerWidth < 500 && drawerToggleClicked]) 



	const sideDrawerClosedHandler = () => {
		setShowSideDrawer(false);
		setDrawerToggleClicked(false)
	};

	const sideDrawerToggleHandler = () => {
		setShowSideDrawer(!showSideDrawer)
			// showSideDrawer ? setShowSideDrawer(false) : setShowSideDrawer(true);
			setDrawerToggleClicked(false)

		// this.setState((prevState) => {
			// return {
			// 	showSideDrawer: !prevState.showSideDrawer,
			// 	drawerToggleClicked: false
			// };
		// });
	};

	
		return (
			<Eject>
				<Toolbar isAuth={props.isAuthenticated} drawerToggleClicked={sideDrawerToggleHandler} />
				<SideDrawer
					isAuth={props.isAuthenticated}
					open={showSideDrawer}
					closed={sideDrawerClosedHandler}
				/>
				<main className={classes.Content}>{props.children}</main>
			</Eject>
		);
	}


const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
		loading: state.auth.loading
	};
};

export default connect(mapStateToProps)(layout);
