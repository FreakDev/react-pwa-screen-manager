import React from 'react'

import { Link } from 'react-router-dom'

import './NavigationBar.css'

export default ({ pages, position, ...props }) => {
    return (
        <nav className={'navbar ' + position}>{
            props.render ? 
                props.render(pages) :
                (
                <ul>{
                    Array.isArray(pages) && pages.map((page, k) => {
                        return (
                            <li key={k}>
                                <Link to={ page.path }>{
                                    props.link ? props.link(page) : page.name
                                }</Link>
                            </li>    
                        )
                    })
                }</ul>
                )
        }</nav>
    )
}