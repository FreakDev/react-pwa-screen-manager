import React, { Component } from 'react';
import { Route } from 'react-router-dom';

export class Page extends Component {
    render() {
        const props = this.props
        return (
            <div className="page">
                <h1>{props.name}</h1>
                { props.children }
            </div>
        )
    }
}

const RoutePage = (props) => {
    return (
        <Route exact={props.exact} path={props.path} render={() => (
            <Page { ...props } />
        )} />
    )
}

export default RoutePage;
