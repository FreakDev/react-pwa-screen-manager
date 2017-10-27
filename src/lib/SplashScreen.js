import React from 'react'

export default ({ children, ...props }) => (
    <div style={ props.style } className="screen splash">
        { children }
    </div>
)