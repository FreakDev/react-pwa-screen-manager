import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import { TransitionGroup } from 'react-transition-group'

import './App.css';

const transitionStyles = {
	entering: { opacity: 0 },
	entered: { opacity: 1 },
};

const firstChild = props => {
	const childrenArray = React.Children.toArray(props.children);
	return childrenArray[0] || null;
};

class Pages extends Component {
	render() {
		const { children } = this.props
		return (
			<Router><div>{
				React.Children.map(children, (child, i) => {
					console.log(child.props.exact, child.props.path)
					return (
						<Route exact={child.props.exact} path={child.props.path} children={({ match, ...rest }) => (
							<TransitionGroup
								component={firstChild}
							>
								{match && React.cloneElement(child, { ...rest })}
							</TransitionGroup>
						)
						} />
					)
				})
			}</div></Router>
		);
	}
}

export default Pages;
