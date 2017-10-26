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
		const routes = children.filter( c => c.type === Page )
		const animatedPages = children.filter( r => !r.props.noAnim )
		const notAnimatedPages = children.filter( r => r.props.noAnim )
		const pages = routes.filter(r => !r.props.noNavbar).map(r => ({ name: r.props.name, path: r.props.path }))
		const navbars = children.filter(child => child.type === NavigationBar)

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
							animatedPages.map(page => {
								const { exact, path, ...props } = page.props
								return (
									<Route exact={exact} path={path} render={() => React.cloneElement(page, { ...props })} />											
								)
							})
						}
						</Switch>
					</section>
				</CSSTransition>
				<section className={"page-inner"}>
					<Switch location={location}>
					{
						notAnimatedPages.map(page => {
							const { exact, path, ...props } = page.props
							return (
								<Route exact={exact} path={path} render={() => React.cloneElement(page, { ...props })} />											
							)
						})
					}
					</Switch>
				</section>
				{ navbars.map((navbar) => {
					return React.cloneElement(navbar, { pages })
				}) }
			</TransitionGroup>								
		);
	}
}

const PageManagerWithRouter = withRouter(PageManager)

export default props => {
	return (
	<Router>
		<PageManagerWithRouter { ...props } />
	</Router>
)};
