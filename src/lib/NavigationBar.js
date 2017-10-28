import React from 'react'

import { Link } from 'react-router-dom'

import './NavigationBar.css'

export default ({ pages, position, location, ...props }) => {
    return (
        <nav className={'navbar ' + position}>{
            props.render ? 
                props.render(pages, location) :
                (
                <ul>{
                    Array.isArray(pages) && pages.map((page, k) => {
                        return (
                            <li key={k}  className={ location.pathname === page.path ? 'active' : '' }>
                                <Link to={ page.path }>{
                                    props.link ? props.link(page, location.pathname === page.path) : page.name
                                }</Link>
                            </li>    
                        )
                    })
                }</ul>
                )
        }</nav>
    )
}