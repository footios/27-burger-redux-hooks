import React, { Component } from 'react';
import Eject from '../Eject/Eject';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

// We moved Layout to hoc because it wraps the BurgerBuilder
// in the App comp.

// Child of App
class Layout extends Component {
	state = {
		showSideDrawer: false,
		DrawerToggleClicked: false // with this the sideDrawer opens only when the button is clicked
	};

	componentDidMount() {
		window.addEventListener('resize', () => {
			this.setState((prevState) => {
				/* Now the sideDrawer open when `window.innerWidth < 500` 
					and the DrawerToggleClicked button is clicked.
					Otherwise it opens when window.innerWidth < 500 
					and keeps on opening on every componentMount,
					e.g. when adding ingredients*/
				const DrawerToggleClicked = prevState.DrawerToggleClicked;
				return {
					showSideDrawer: window.innerWidth < 500 && DrawerToggleClicked
				};
			});
		});
	}

	sideDrawerClosedHandler = () => {
		this.setState({ showSideDrawer: false, DrawerToggleClicked: false });
	};

	sideDrawerToggleHandler = () => {
		// if (window.innerWidth < 500) {
		this.setState((prevState) => {
			return {
				showSideDrawer: !prevState.showSideDrawer,
				DrawerToggleClicked: false
			};
		});
		// }
	};

	render() {
		return (
			<Eject>
				<Toolbar isAuth={this.props.isAuthenticated} DrawerToggleClicked={this.sideDrawerToggleHandler} />
				<SideDrawer
					isAuth={this.props.isAuthenticated}
					open={this.state.showSideDrawer}
					closed={this.sideDrawerClosedHandler}
				/>
				<main className={classes.Content}>{this.props.children}</main>
			</Eject>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
		loading: state.auth.loading
	};
};

export default connect(mapStateToProps)(Layout);
