import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import PageManager from './PageManager';
import Page from './Page';
import NavigationBar from './NavigationBar';

ReactDOM.render(
<div>
    <PageManager noRouter>
        <Page style={{ background: 'yellow' }} name="splash" exact path="/splash" noAnim noNavbar >
            <h1>Splash</h1>
        </Page>
        <Page style={{ background: 'red' }} name="home" exact path="/">
            <h1>Home</h1>
        </Page>
        <Page style={{ background: 'green' }} name="page 2" exact path="/two">
            <h1>page 2</h1>
        </Page>
        <Page style={{ background: 'blue' }} name="page 3" exact path="/three">
            <h1>Page 3</h1>
        </Page>
        <NavigationBar position="bottom" />
    </PageManager>
</div>
, document.getElementById('root'));
