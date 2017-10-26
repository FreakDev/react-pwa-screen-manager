import React, { Component } from 'react';

import { withRouter, Switch } from 'react-router-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Page from './Page'
import NavigationBar from './NavigationBar'
import ForbiddenPage from './ForbiddenPage'
import SplashScreen from './SplashScreen'

import './PageManager.css';

const timeout = { enter: 500, exit: 500 };

export class PageManager extends Component {
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

		const pages = children.filter( c => c.type === Page )
		const navbars = children.filter(child => child.type === NavigationBar )		
		const forbiddenPage = children.find( c => c.type === ForbiddenPage )		
		const splashScreen = children.find( c => c.type === SplashScreen )		
		
		const animatedPages = pages.filter( r => !r.props.noAnim )
		const notAnimatedPages = pages.filter( r => r.props.noAnim )
		const hideNavbarPath = pages.filter( r => r.props.hideNavbar ).map(r => r.props.path)
		const navbarPageInfos = pages.filter(r => !r.props.noNavbar).map(r => ({ name: r.props.name, path: r.props.path }))



		const renderPages = (pages) => pages.map((page, i) => {
			const { exact, path, ...props } = page.props
			return (
				<Route key={i} exact={exact} path={path} render={() => {
					if (!this.props.authCheck || (!page.props.protected || this.props.authCheck()))
						return React.cloneElement(page, { ...props })
					else
						return forbiddenPage || null
				} } />
			)
		})

		return (
			<div className="page-container">
				<section className={"page-inner"}>
					<Switch location={location}>
					{
						renderPages(notAnimatedPages)
					}
					</Switch>
				</section>
				<TransitionGroup component="div" className={(this.state.direction >= 0 ? "right" : "left")}>
					<CSSTransition
						key={currentKey}
						timeout={timeout}
						classNames="page"
						appear
					>
						<section className={"page-inner"}>
							<Switch location={location}>
							{
								renderPages(animatedPages)
							}
							</Switch>	
						</section>
					</CSSTransition>
				</TransitionGroup>
				{ hideNavbarPath.indexOf(location.pathname) === -1 && navbars.map((navbar, k) => {
					return React.cloneElement(navbar, { pages: navbarPageInfos, key: k })
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

const PageManagerWithRouter = withRouter(PageManager)

export default props => {
	return (
	<Router>
		<PageManagerWithRouter { ...props } />
	</Router>
)};
