import React, { Component } from 'react';

class Page extends Component {
    render() {
        const props = this.props
        return (
            <div className="page">{props.name}</div>
        );
    }
}

export default Page;
