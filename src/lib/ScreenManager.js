import React, { Component } from 'react';

import { withRouter, Switch, Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Screen from './Screen'
import NavigationBar from './NavigationBar'
import ForbiddenScreen from './ForbiddenScreen'
import SplashScreen from './SplashScreen'

import './ScreenManager.css';

const timeout = { enter: 500, exit: 500 };

export class ScreenManager extends Component {
	constructor(props) {
		super(props)

		this.state = {
			direction: 0,
			hideSplash: false,
			renderSplash: this.props.children.find( c => c.type === SplashScreen ) !== undefined,
		}
	
	}

	componentDidMount() {
		if (this.state.renderSplash) {
			setTimeout(() => {
				this.setState({
					hideSplash: true,
				})
				setTimeout(() => {
					this.setState({
						renderSplash: false
					})
				}, timeout.exit)	
			}, 3000)	
		}
	}

	componentWillReceiveProps(nextProps) {
		const findScreen = (ref, elem) => {
			return elem.indexOf(ref) === 0;
		};
		const pageOrder = React.Children.map(this.props.children, (child) => child.props.path)

		let indexCurrent = pageOrder.findIndex(
			findScreen.bind(this, this.props.location.pathname)
		);
		let indexNext = pageOrder.findIndex(
			findScreen.bind(this, nextProps.location.pathname)
		);

		this.setState({
			direction: indexNext - indexCurrent
		});
	}

	render() {
		const { children, location } = this.props
		const currentKey = location.pathname.split("/")[1] || "/";

		const pages = children.filter( c => c.type === Screen )
		const navbars = children.filter(child => child.type === NavigationBar )		
		const forbiddenScreen = children.find( c => c.type === ForbiddenScreen )		
		const splashScreen = children.find( c => c.type === SplashScreen )		
		
		const animatedScreens = pages.filter( r => !r.props.noAnim )
		const notAnimatedScreens = pages.filter( r => r.props.noAnim )
		const hideNavbarPath = pages.filter( r => r.props.hideNavbar ).map(r => r.props.path)
		const navbarScreenInfos = pages.filter(r => !r.props.noNavbar).map(r => ({ name: r.props.name, path: r.props.path }))

		const renderForbidden = (screen) => {
			if (screen) {
				if (screen.props.redirectTo) {
					return (
						<Redirect to={screen.props.redirectTo} />
					)
				} else {
					return screen
				}
			} else 
				return null
		}

		const renderScreens = (pages) => pages.map((page, i) => {
			const { exact, path, ...props } = page.props
			return (
				<Route key={i} exact={exact} path={path} render={() => {
					if (!this.props.authCheck || (!page.props.protected || this.props.authCheck()))
						return React.cloneElement(page, { ...props })
					else
						return renderForbidden(forbiddenScreen)
				} } />
			)
		})

		return (
			<div className="screen-container">
				<section className={"screen-inner"}>
					<Switch location={location}>
					{
						renderScreens(notAnimatedScreens)
					}
					</Switch>
				</section>
				<TransitionGroup component="div" className={(this.state.direction >= 0 ? "right" : "left")}>
					<CSSTransition
						key={currentKey}
						timeout={timeout}
						classNames="screen"
						appear
					>
						<section className={"screen-inner"}>
							<Switch location={location}>
							{
								renderScreens(animatedScreens)
							}
							</Switch>	
						</section>
					</CSSTransition>
				</TransitionGroup>
				{ hideNavbarPath.indexOf(location.pathname) === -1 && navbars.map((navbar, k) => {
					return React.cloneElement(navbar, { pages: navbarScreenInfos, key: k })
				}) }
				{ this.state.renderSplash ? (
				<CSSTransition
					timeout={timeout}
					in={this.state.hideSplash}
					classNames="splash"
				>
					{ splashScreen }
				</CSSTransition>
				): null }
			</div>
		);
	}
}

const ScreenManagerWithRouter = withRouter(ScreenManager)

export default props => {
	return (
	<Router>
		<ScreenManagerWithRouter { ...props } />
	</Router>
)};
