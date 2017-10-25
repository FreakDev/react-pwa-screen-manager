import React, { Component } from 'react';

export class Page extends Component {
    render() {
        const props = this.props
        return (
            <div style={ props.style } className="page">
                <h1>{props.name}</h1>
                { props.children }
            </div>
        )
    }
}

export default Page;
