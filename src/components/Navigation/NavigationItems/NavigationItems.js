import React from 'react';
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact active>Burguer Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/auth">Authenticate</NavigationItem> : null}
    </ul>
);

export default navigationItems;