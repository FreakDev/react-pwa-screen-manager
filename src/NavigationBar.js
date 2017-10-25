import React from 'react'

import { Link } from 'react-router-dom';

export default ({ pages }) => {
    return (
        <nav>
            <ul>{
                pages.map((page, k) => {
                    return (
                        <li key={k}>
                            <Link to={ page.path }>
                                { page.name }
                            </Link>
                        </li>    
                    )
                })
            }</ul>
        </nav>
    )
}