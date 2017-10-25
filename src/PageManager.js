import React, { Component } from 'react';

import { withRouter, Switch } from 'react-router-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Page from './Page'
import NavigationBar from './NavigationBar'

import './PageManager.css';

export class PageManager extends Component {
	state = {
		direction: 0
	}

	componentWillReceiveProps(nextProps) {
		const findPage = (ref, elem) => {
			return elem.indexOf(ref) === 0;
		};
		const pageOrder = React.Children.map(this.props.children, (child) => child.props.path)

		let indexCurrent = pageOrder.findIndex(
			findPage.bind(this, this.props.location.pathname)
		);
		let indexNext = pageOrder.findIndex(
			findPage.bind(this, nextProps.location.pathname)
		);

		this.setState({
			direction: indexNext - indexCurrent
		});
	}

	render() {
		const { children, location } = this.props
		const currentKey = location.pathname.split("/")[1] || "/";
		const timeout = { enter: 500, exit: 500 };
		let pages = []
		const routes = children.filter( child => {
			if (child.type === Page) {
				pages.push({ name: child.props.name, path: child.props.path })
				return child
			} else {
				return null
			}
		})
		const navbars = children.filter(child => {
			return child.type === NavigationBar
		})
		return (
			<TransitionGroup component="div" className={"page-container " + (this.state.direction >= 0 ? "right" : "left")}>
				<CSSTransition
					key={currentKey}
					timeout={timeout}
					classNames="page"
					appear
				>
					<section className={"page-inner"}>
						<Switch location={location}>
						{
							React.Children.map(routes, route => {
								const { exact, path, ...props } = route.props
								return (
									<Route exact={exact} path={path} render={() => React.cloneElement(route, { ...props })} />											
								)
							})
						}
						</Switch>
					</section>
				</CSSTransition>
				{ React.Children.map(navbars, (navbar) => {
					return React.cloneElement(navbar, { pages })
				}) }
			</TransitionGroup>								
		);
	}
}

const PageManagerWithRouter = withRouter(PageManager)

export default props => (
	<Router>
		<PageManagerWithRouter { ...props } />
	</Router>
);
