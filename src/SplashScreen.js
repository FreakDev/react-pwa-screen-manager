import React from 'react'

export default ({ children, ...props }) => (
    <div style={ props.style } className="page splash">
        { children }
    </div>
)