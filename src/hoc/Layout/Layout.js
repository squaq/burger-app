import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.css';
// import Backdrop from '../UI/Backdrop/Backdrop';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	state = {
		showSideDrawer: false
	}

	sideDrawerToggleHandler = () => {
		this.setState((prevState) => {
			this.setState ({showSideDrawer: !prevState.showSideDrawer});
		})
	}

	render () {
		return (
			<Aux>
				<Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
				<SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerToggleHandler}/>
				<div>Toolbar, SideDrawer, Backdrop</div>
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Aux>
		);
	}
}
export default Layout;