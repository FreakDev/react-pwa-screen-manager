import React from 'react'

import { Link } from 'react-router-dom';

export default ({ pages, ...props }) => {
    return (
        <nav>{
            props.render ? 
                props.render(pages) :
                (
                <ul>{
                    pages.map((page, k) => {
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