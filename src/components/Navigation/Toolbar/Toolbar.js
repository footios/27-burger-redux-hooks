import React, { useState } from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const useForceUpdate = () => {
	const [ value, set ] = useState(true);
	return () => set(!value);
};

// child of Layout
const toolbar = (props) => {
	const forceUpdate = useForceUpdate();
	if (props.isAuth) {
		setTimeout(() => {
			forceUpdate();
		}, 1);
	}

	const email = localStorage.getItem('email');
	return (
		<header className={classes.Toolbar}>
			<DrawerToggle clicked={props.DrawerToggleClicked} />
			<div className={classes.Logo}>
				<Logo />
			</div>
			{props.isAuth ? <div className={classes.UserEmail}> {email} </div> : null}
			<nav className={classes.DesktopOnly}>
				<NavigationItems isAuthenticated={props.isAuth} />
			</nav>
		</header>
	);
};

export default toolbar;
