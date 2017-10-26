import React from 'react'
import ReactDOM from 'react-dom'

import { Redirect } from 'react-router-dom';

import './index.css'

import PageManager from './PageManager'
import Page from './Page'
import NavigationBar from './NavigationBar'
import ForbiddenPage from './ForbiddenPage'


ReactDOM.render(
<div>
    <PageManager 
        authCheck={() => {
            // return auth status
            return true
        }}
    >
        <Page style={{ background: 'yellow' }} name="splash" exact path="/" noAnim noNavbar hideNavbar >
            <h1>Splash</h1>
        </Page>
        <Page style={{ background: 'cyan' }} name="home" exact path="/home">
            <h1>Home</h1>
        </Page>
        <Page protected style={{ background: 'green' }} name="page 2" exact path="/two">
            <h1>page 2</h1>
        </Page>
        <Page style={{ background: 'blue' }} name="page 3" exact path="/three">
            <h1>Page 3</h1>
        </Page>
        <ForbiddenPage style={{ background: 'red' }} name="forbidden" exact path="/forbidden">
            <Redirect to={{ pathname:"/" }} />
        </ForbiddenPage>        
        <NavigationBar position="bottom" />
    </PageManager>
</div>
, document.getElementById('root'));
