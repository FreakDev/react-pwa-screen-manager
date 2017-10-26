import React from 'react'

export default ({ children, ...props }) => (
    <div style={ props.style } className="screen forbidden">
        { children }
    </div>
)