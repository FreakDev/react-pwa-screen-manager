import React from 'react'

export default ({ children, ...props }) => (
    <div style={ props.style } className="page forbidden">
        { children }
    </div>
)