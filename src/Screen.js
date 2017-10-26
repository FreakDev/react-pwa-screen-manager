import React, { Component } from 'react';

export class Screen extends Component {
    render() {
        const props = this.props
        return (
            <div style={ props.style } className="screen">
                { props.children }
            </div>
        )
    }
}

export default Screen;
